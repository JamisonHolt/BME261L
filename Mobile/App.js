import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TempDisplay from './components/tempdisplay';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text style={styles.text}>BLARGH</Text>
        <TempDisplay
          style={styles.tempDisplay}
          chartMin={ 80 }
          chartMax={ 110 }
        />
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
  text: {
    flex: 3,
    color: '#BF5700'
  },
  tempDisplay: {
    flex: 1
  }
});
