import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button } from 'react-native';

import TempDisplay from './components/tempdisplay';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isCelsius: false,
      isPortrait: this.updateIsPortrait()
    }

    Dimensions.addEventListener('change', () => {
      this.setState({
        isPortrait: this.updateIsPortrait()
      });
    });
  }

  updateIsPortrait() {
    const dim = Dimensions.get('screen');
    return dim.width < dim.height;
  }

  render() {
    const styles = this.state.isPortrait ? portraitStyles : landscapeStyles;
    return (
      <View style={styles.background}>
        <Button
          title="Button"
          style={styles.button}
          onPress={() => {this.setState({
            isCelsius: !(this.state.isCelsius)
          });
        }}
        />
        <TempDisplay
          style={styles.tempDisplay}
          isPortrait={ this.state.isPortrait }
        />
      </View>
    );
  }
}


const portraitStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#333F48',
    justifyContent: 'center'
  },
  button: {
    marginTop: 40,
    flex: 3,
    color: '#BF5700'
  },
  tempDisplay: {
    flex: 10,
    flexDirection: 'column',
    backgroundColor: '#333F48',
    alignItems: 'center'
  },
});

const landscapeStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#333F48',
  },
  button: {
    marginTop: 40,
    flex: 1,
    color: '#BF5700',
    flexDirection: 'row'
  },
  tempDisplay: {
    flex: 10,
    backgroundColor: '#333F48',
  },
});
