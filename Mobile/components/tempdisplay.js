import React from 'react';
import { StyleSheet, Text, View, Vibration, Alert } from 'react-native';
import RawChart from './chart';
import BluetoothSerial from 'react-native-bluetooth-serial';

const CRITICAL_TEMP = 105;

export default class TempDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPortrait: this.props.isPortrait,
      temp: 100,
      deviceID: null,
      isConnected: false,
      isRecording: false,
      clearState: false,
      isCelsius: false
    };
    
    const MAX_NUM_BUFFER_ITEMS = 5;
    this.serialDataLength = 7;
    this.maxBufferSize = MAX_NUM_BUFFER_ITEMS * this.serialDataLength;

    // Event listener to record as soon as any new temperature is recorded
    BluetoothSerial.on('read', (data) => {
      const newTemp = parseFloat(data.data);
      // only update state in the case that we are recording
      if (this.state.isRecording) {
        this.setState({
          temp: newTemp
        });
        // TODO: Make sure this works properly
        if (newTemp > CRITICAL_TEMP) {
          Vibration.vibrate(10000);
          Alert.alert('Critical Temperature Reached!', 'Consider visiting a doctor');
        }
      }
    });
  }


  /**
   * Allows our main app to pass down new properties, in order to sync app state
   * 
   * @param {Updated properties of our component} nextProps 
   */
  componentWillReceiveProps(nextProps) {
    if (this.state.deviceID !== nextProps.deviceID) {
      this.setState({ deviceID: nextProps.deviceID })
    }
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
    }
    if (this.state.isCelsius !== nextProps.isCelsius) {
      this.setState({ isCelsius: nextProps.isCelsius });
    }
  }


  /**
   * If our device is recording, stop. Otherwise, start recording
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
      // Make sure our serial is empty in case of device change
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
    // Prevent accidental changes while still trying to connect
    if (this.state.isConnected === 'Connecting') {
      return;
    } else {
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
    let currTemp = this.state.isCelsius ? (this.state.temp - 32) * 5 / 9 : this.state.temp;
    const letter = this.state.isCelsius ? '°C' : '°F';
    let tempText = null;
    if (!this.state.isRecording) {
      tempText = "N/A";
    } else {
      tempText = currTemp.toFixed(1) + letter;
    }
    const styles = this.state.isPortrait ? portraitStyles : landscapeStyles;
    return (
      <View style={ this.props.style }>
        <Text style={ styles.tempText }>{tempText}</Text>
        <RawChart style={ styles.chartStyle }
          temp={ currTemp }
          isCelsius = { this.state.isCelsius }
        />
      </View>
    );
  }

  getRecentTemp() {
    return this.state.data[this.state.ptr];
  }
}

const portraitStyles = StyleSheet.create({
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

const landscapeStyles = StyleSheet.create({
  tempText: {
    flex: 9,
    flexDirection: 'row',
    color: '#BF5700',
    fontSize: 80
  },
  chartStyle: {
    flex: 10,
    flexDirection: 'row',
    padding: 100,
    marginTop: -200,
  }
});