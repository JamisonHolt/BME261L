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
      isCelsius: false
    };
    
    const MAX_NUM_BUFFER_ITEMS = 5;
    this.serialDataLength = 7;
    this.maxBufferSize = MAX_NUM_BUFFER_ITEMS * this.serialDataLength;

    // Event listener to record as soon as any new temperature is recorded
    BluetoothSerial.on('read', (data) => {
      // only update state in the case that we are recording
      if (this.state.isRecording) {
        this.setState({
          temp: parseFloat(data.data)
        });
      }
    });
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.isPortrait !== nextProps.isPortrait) {
      this.setState({ isPortrait: nextProps.isPortrait });
    }
    if (this.props.deviceID !== nextProps.deviceID) {
      this.setState({ deviceID: nextProps.deviceID });
    }
    if (this.props.isConnected !== nextProps.isConnected) {
      nextProps.isConnected ? this.connect() : this.disconnect();
    }
    if (this.props.isRecording !== nextProps.isRecording) {
      this.setState({ isRecording: !this.state.isRecording });
    }
  }

  /**
   * Connects to the bluetooth device provided in this component's deviceID prop
   */
  connect() {
    // Block "Disconnecting" while trying to connect
    this.setState({isConnected: 'Connecting'});
    // Connect to the thermactive device
    BluetoothSerial.connect(this.state.deviceID)
    .then(res => {
      // Make sure our serial is empty in case of device change
      this.setState({
        isConnected: true
      });
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
    if (this.state.isConnected === 'Connecting') {
      return;
    } else {
      BluetoothSerial.disconnect()
      .then(res => {
        this.setState({
          isConnected: false,
          isRecording: false
        });
        Alert.alert('Bluetooth', 'Disconnected from ThermActive device');
      })
      .catch(err => {
        Alert.alert('Bluetooth', 'Issue disconnecting from ThermActive device');
      })
    }
  }

  beginReading() {
    setInterval(() => {
      // Only read in temperature if value available in buffer
      BluetoothSerial.available()
      .then((numAvailable) => {
        if (numAvailable >= 7) {
          this.readTemp();
        }
      })
      .catch((err) => {
        console.log("Error getting available serial reads");
      });
    }, 50);
  }

  readTemp() {
    BluetoothSerial.readUntilDelimiter("\r\n")
    .then((tempString) => {
      // Make sure any "shredded" serial values are filtered out
      if (tempString.length === this.serialDataLength) {
        const tempFloat = parseFloat(tempString);
        this.setState(() => {
          // Add temperature to state for display
          return {
            temp: tempFloat,
          };
          
        });
        // TODO: Make sure this works properly
        if (tempFloat > CRITICAL_TEMP) {
          Vibration.vibrate(10000);
        }
      }
      // Automatically clean buffer in case of too many values
      this.clearBuffer();
    })
    .catch((err) => {
      console.log("Error reading temp");
    });
  }

  clearBuffer() {
    // Make sure to only clear buffer if too many values
    BluetoothSerial.available()
    .then((numAvailable) => {
      if (numAvailable > this.maxBufferSize) {
        BluetoothSerial.clear();
      }
    })
    .catch((err) => {
      console.log("Error clearing serial buffer");
    });
  }

  render() {
    let currTemp = this.state.isCelsius ? (this.state.temp - 32) * 5 / 9 : this.state.temp;
    const letter = this.state.isCelsius ? '°C' : '°F';
    const styles = this.state.isPortrait ? portraitStyles : landscapeStyles;
    return (
      <View style={ this.props.style }>
        <Text style={ styles.tempText }>{currTemp.toFixed(1) + letter}</Text>
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