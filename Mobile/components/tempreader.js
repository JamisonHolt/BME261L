import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TempReader extends React.Component {
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
    }, 1000);
  }
  render() {
    let temp = this.state.temp.toString();
    return (
      <Text>{temp}</Text>
    );
  }
  getRecentTemp() {
    return this.state.data[this.state.ptr];
  }

}
// this.setState(previousState => {
//   return { isShowingText: !previousState.isShowingText };
// });
