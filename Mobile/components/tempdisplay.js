import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RawChart from './chart';
import BluetoothSerial from 'react-native-bluetooth-serial';

export default class TempDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPortrait: this.props.isPortrait,
      temp: 80,
      time: new Date().toLocaleString(),
      celsius: false,
      deviceID: '00:21:13:01:1C:51'
    };
    const MAX_NUM_BUFFER_ITEMS = 5;
    this.serialDataLength = 7;
    this.maxBufferSize = MAX_NUM_BUFFER_ITEMS * this.serialDataLength;
  }

  /**
   *
   */
  componentWillMount() {
    // Connect to the specified device
    BluetoothSerial.connect(this.state.deviceID)
    .then((res) => {
      console.log('Connected to device');
      // Make sure our serial is empty in case of device change
      BluetoothSerial.clear();
      this.beginReading();
    })
    .catch((err) => {
      console.log('Issue connecting to device');
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isPortrait !== nextProps.isPortrait) {
      this.setState({ isPortrait: nextProps.isPortrait });
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
        this.setState(() => {
          // Add temperature to state for display
          let tempFloat = parseFloat(tempString);
          return {
            temp: tempFloat,
            time: new Date().toLocaleString()
          };
        });
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
    let currTemp = this.state.temp;
    const letter = this.state.celsius ? '°C' : '°F';
    const styles = this.state.isPortrait ? portraitStyles : landscapeStyles;
    return (
      <View style={ this.props.style }>
        <Text style={ styles.tempText }>{currTemp.toString() + letter}</Text>
        <RawChart style={ styles.chartStyle }
          temp={ currTemp }
          isCelsius = { this.state.isCelsius }
          min = { 80 }
          max = { 120 }
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