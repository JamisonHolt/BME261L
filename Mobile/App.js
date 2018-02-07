import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RawChart from './components/chart';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RawChart />
        <View>
          <Text style={styles.text}>Hello World!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000'
  },
});
//
