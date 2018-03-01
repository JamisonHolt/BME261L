import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RawChart from './components/chart';
import TempDisplay from './components/tempdisplay';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>Header Placeholder</Text>
        </View>
        <TempDisplay style={styles.text} />
        <View style={styles.container}>
          <Text style={styles.text}>Footer Placeholder</Text>
        </View>
      </View>
    );
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
//
