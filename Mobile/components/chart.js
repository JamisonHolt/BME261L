import React from 'react';
import { StyleSheet, Text, View, Component } from 'react-native';
import PureChart from 'react-native-pure-chart';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chart: {
    width: 10,
    height: 10,
  },
});

export default class RawChart extends React.Component {
  render() {
    let sampleData = [30, 200, 170, 250, 10];
    return(
      <View style={styles.container}>
        <PureChart style={styles.chart} data={sampleData} type='line' />
      </View>
    );
  }
}
