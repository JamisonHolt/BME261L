import React from 'react';
import { StyleSheet, Text, View, Vibration, Alert } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

// Import our self-made chart
import RawChart from './chart';


/**
 * The entire TempDisplay module, which combines the chart with bluetooth and text
 */
export default class TempDisplay extends React.Component {

  /**
   * Initializes our TempDisplay by binding methods (to allow)
   * 
   * @param {Map} props - properties passed from App.js to tempdisplay.js
   */
  constructor(props) {
    super(props);
    this.state = {
      fahrenheit: null,
      celsius: null,
      deviceID: null,

      isConnected: false,
      isRecording: false,
      clearState: false,
      isCelsius: false
    };

    // Initialize our critical "warning" level temperature
    this.CRITICAL_FAHR_TEMP = 105;

    // Bind all passed down callback functions
    this.toggleConnect = this.toggleConnect.bind(this);

    // Prevent us from continuously alerting the user in case of dangerous temperature
    this.notAlertedYet = true
    
    // Event listener to record as soon as any new temperature is recorded
    BluetoothSerial.on('read', (data) => {
      const newFahr = parseFloat(data.data);
      // Check if temperature doesn't make sense, such as a temporary disconnection
      if (60 > newFahr || newFahr > 120) {return;} 
      else if (this.state.isRecording) {
        // only update state in the case that we are recording
        this.setState({
          fahrenheit: newFahr,
          celsius: (newFahr - 32) * 5 / 9
        });
        // Alert user if the recorded state is a dangerous level by vibrating and sending msg
        if (newFahr > this.CRITICAL_FAHR_TEMP && this.notAlertedYet) {
          this.notAlertedYet = false;
          Vibration.vibrate(5000);
          Alert.alert('Dangerous Body Temperature Reached!', 'Consider visiting a doctor');
        }
      }
    });
  }


  /**
     * Allows our main app to pass down new properties, in order to sync app state. This is called every
     *   time that we update the parent's state, leading to synchronization of state between components
     * 
     * @param {Map} nextProps - Map of TempDisplay properties to be updated. Called when parent changes state
     */
  componentWillReceiveProps(nextProps) {
    // Once the parent finds our bluetooth device, save it
    if (this.state.deviceID !== nextProps.deviceID) {
      this.setState({ deviceID: nextProps.deviceID })
    }
    // Update connections status when needed.
    //   If connecting, connect and then update state to true
    //   if disconnected, make sure device follows through and disconnects, updating to false
    if (this.state.isConnected !== nextProps.isConnected) {
      this.setState({ isConnected: nextProps.isConnected });
      if (nextProps.isConnected === false) { this.disconnect(); }
      else if (nextProps.isConnected === 'Connecting') { this.connect(); }
    }
    if (this.state.isRecording !== nextProps.isRecording) {
      this.setState({ isRecording: nextProps.isRecording });
    }
    if (this.state.clearState !== nextProps.clearState) {
      this.setState({ clearState: nextProps.clearState });
      this.notAlertedYet = true;
    }
    if (this.state.isCelsius !== nextProps.isCelsius) {
      this.setState({ isCelsius: nextProps.isCelsius });
    }
  }


  /**
   * Update's parent's recording state to opposite of current state
   */
  toggleConnect() {
    this.props.toggleConnect(true);
  }
  
  /**
   * Connects to the bluetooth device provided in this component's deviceID prop
   */
  connect() {
    // Connect to the thermactive device
    BluetoothSerial.connect(this.state.deviceID)
    .then(res => {
      // Update parent's state to true after the device has successfully connected
      this.toggleConnect();
      Alert.alert('Bluetooth', 'Connected to ThermActive device');
    })
    .catch(err => {
      Alert.alert('Bluetooth', 'Issue connecting to ThermActive device');
    });
  }

  /**
   * Disconnects to the currently connected bluetooth device
   */
  disconnect() {
    // Use 'Connecting' status as way to block "disconnecting" before we've finished connecting
    if (this.state.isConnected === 'Connecting') {
      return;
    } else {
      // Disconnect from serial and alert the user
      BluetoothSerial.disconnect()
      .then(res => {
        Alert.alert('Bluetooth', 'Disconnected from ThermActive device');
      })
      .catch(err => {
        Alert.alert('Bluetooth', 'Issue disconnecting from ThermActive device');
      })
    }
  }

  render() {
    // Find the correct formatting of the temperature text based on current unit type
    let currTemp = this.state.isCelsius ? this.state.celsius : this.state.fahrenheit;
    const letter = this.state.isCelsius ? '°C' : '°F';
    let tempText = null;

    if (!this.state.isRecording || this.state.celsius === null) {
      // Hide temperature status if we are not recording - doesn't make sense to show random num
      tempText = "N/A";
    } else {
      // Format our number to 1 decimal point (2 looks bad and isn't necessary)
      tempText = currTemp.toFixed(1) + letter;
    
    }
    return (
      <View style={ this.props.style }>
        <Text style={ styles.tempText }>{tempText}</Text>
        <RawChart style={ styles.chartStyle }
          fahrenheit={ this.state.fahrenheit }
          celsius={ this.state.celsius }
          isCelsius = { this.state.isCelsius }
          clearState = { this.state.clearState }
        />
      </View>
    );
  }
}

// CSS styles for our tempdisplay to make it look pertty
const styles = StyleSheet.create({
  tempText: {
    flex: 9,
    color: '#BF5700',
    fontSize: 130,
    marginTop: 50

  },
  chartStyle: {
    flex: 20,
    paddingLeft: 20,
    marginBottom: -200,
    marginTop: -100
  }
});