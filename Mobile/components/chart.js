import React from 'react';
import { StyleSheet, Text, View, Component } from 'react-native';
import { LineChart } from 'react-native-svg-charts'

export default class RawChart extends React.Component {
  constructor(props) {
    super(props);
    const dataSize = 20;
    let initialData = [];
    for (let i=0; i<dataSize; i++) {
      initialData.push(0);
    }
    this.state = {
      temp: initialData
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.temp !== nextProps.temp) {
      let nextTemp = this.state.temp.slice(1);
      nextTemp.push(nextProps.temp);
      this.setState({temp: nextTemp});
    }
  }

  render() {
    return (
      <LineChart
      style={ { flex: 10 } }
      data={ this.state.temp }
      svg={{ stroke: 'rgb(134, 65, 244)' }}
      contentInset={ { top: 20, bottom: 20 } }
      />
    )
  }

}
