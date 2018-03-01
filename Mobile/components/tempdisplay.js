import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RawChart from './chart';

export default class TempDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      temp: -1.0
    };
    setInterval(() => {
      this.setState(() => {
        let nextTemp = Math.random();
        return {temp: nextTemp};
      });
    }, 25);
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
