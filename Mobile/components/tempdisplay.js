import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RawChart from './chart';
import BluetoothSerial from 'react-native-bluetooth-serial';

export default class TempDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      temp: -1.0,
      deviceID: '00:21:13:01:1C:51'
    };
     // this number should preferably be divisible by 7
    this.maxBufferSize = 14;
    this.serialDataLength = 7;
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
    }, 300);
  }

  readTemp() {
    BluetoothSerial.readUntilDelimiter("\r\n")
    .then((tempString) => {
      // Make sure any "shredded" serial values are filtered out
      if (tempString.length === this.serialDataLength) {
        this.setState(() => {
          // Add temperature to state for display
          let tempFloat = parseFloat(tempString);
          return {temp: tempFloat};
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
    return (
      <View style={styles.middle}>
        <Text style={styles.text}>{currTemp.toString()}</Text>
        <RawChart temp={currTemp} />
      </View>
    );
  }

  getRecentTemp() {
    return this.state.data[this.state.ptr];
  }

}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#333F48',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#333F48',
    alignItems: 'center',
    justifyContent: 'center'
  },
  middle: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#333F48'
  },
  text: {
    marginTop: 50,
    flex: 1,
    color: '#BF5700'
  }
});
