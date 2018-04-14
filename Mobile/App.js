import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableHighlight, Image} from 'react-native';

import TempDisplay from './components/tempdisplay';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isCelsius: false,
      isPortrait: this.updateIsPortrait(),
      selectedDevice: 'Select a device',
      isRecording: false
    }

    Dimensions.addEventListener('change', () => {
      this.setState({
        isPortrait: this.updateIsPortrait()
      });
    });
    // TODO: Find and store bluetooth devices that have been paired
  }

  updateIsPortrait() {
    const dim = Dimensions.get('screen');
    return dim.width < dim.height;
  }

  getStopPlayButton(styles) {
    let button = null;
    if (this.state.isRecording) {
      return (
        <View style={styles.iconContainer}>
          <TouchableHighlight underlayColor='#b35000' onPress={() => { }} style={styles.touchableHighlight}>
            <Image
              style={styles.icon}
              source={require('./icons/stop.png')}
            />
          </TouchableHighlight>
          <Text style={styles.iconText}>Stop</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.iconContainer}>
          <TouchableHighlight underlayColor='#b35000' onPress={() => { }} style={styles.touchableHighlight}>
            <Image
              style={styles.icon}
              source={require('./icons/record.png')}
            />
          </TouchableHighlight>
          <Text style={styles.iconText}>Record</Text>
        </View>
      )
    }
  }

  render() {
    const styles = this.state.isPortrait ? portraitStyles : landscapeStyles;
    return (
      <View style={styles.background}>
        <TempDisplay
          style={styles.tempDisplay}
          isPortrait={ this.state.isPortrait }
        />
        <View style={styles.toolbarContainer}>
          <View style={styles.iconContainer}>
            <TouchableHighlight underlayColor='#b35000' onPress={() => { }} style={styles.touchableHighlight}>
              <Image
                style={styles.icon}
                source={require('./icons/bluetooth.png')}
              />
            </TouchableHighlight>
            <Text style={styles.iconText}>Connect</Text>
          </View>
          {this.getStopPlayButton(styles)}
          {/* TODO: Start recording when pressed */}          
          <View style={styles.iconContainer}>
            <TouchableHighlight underlayColor='#b35000' onPress={() => { }} style={styles.touchableHighlight}>
              <Image
                style={styles.icon}
                source={require('./icons/clear.png')}
              />
            </TouchableHighlight>
            <Text style={styles.iconText}>Clear</Text>
          </View>
        </View>
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
  toolbarContainer: {
    backgroundColor: '#BF5700',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  touchableHighlight: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10
  },
  icon: {
    height: 30,
    width: 30,
  },
  iconText: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 10,
  },
  tempDisplay: {
    flex: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
});

const landscapeStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#333F48',
  },
  button: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row'
  },
  tempDisplay: {
    flex: 10,
    backgroundColor: '#333F48',
  },
});
