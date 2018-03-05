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

    BluetoothSerial.connect(this.state.deviceID)
    .then((res) => {
      console.log('Connected to device');
      setInterval(() => {
        BluetoothSerial.readFromDevice()
        .then((res) => {
          console.log(res);
          if (res) {
            this.setState(() => {
              // let nextTemp = parseInt(toString(res));
              let nextTemp = parseInt(res);
              return {temp: nextTemp};
            });
          }
        })
        .catch((err) => {
          console.log("DICKCSLDFWS");
        });
      }, 250);
      // Toast.showShortBottom(`Connected to device ${device.name}`)
      // this.setState({ device, connected: true, connecting: false })
    })
    .catch((err) => {
      console.log('Issue connecting to device');
      // Toast.showShortBottom(err.message)
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
