import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableHighlight, Image} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

import TempDisplay from './components/tempdisplay';
import Toolbar from './components/toolbar';

// Name of our device - TODO: Change device's name to ThermActive
const DEVICE_NAME = 'HC-06';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isCelsius: false,
      isPortrait: this.updateIsPortrait(),
      isRecording: false,
      deviceID: []
    }
    
    // Bind all callback functions
    this.toggleRecording = this.toggleRecording.bind(this);

    // Find any paired ThermActive BT devices
    BluetoothSerial.list()
    .then((res) => {
      const id = res.find(device => device.name === DEVICE_NAME).id;
      this.setState({
        deviceID: id
      });
    }).catch((err) => {
      alert("Issue Listing Paired devices");
    });

    // Add an event listener to allow UI changes on phone orientation changes
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

  toggleRecording() {
    this.setState({
      isRecording: !this.state.isRecording
    });
  }

  render() {
    const styles = this.state.isPortrait ? portraitStyles : landscapeStyles;
    return (
      <View style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ThermActive</Text>
        </View>
        <TempDisplay
          style={styles.tempDisplay}
          isPortrait={ this.state.isPortrait }
        />
        <Toolbar 
          toggleRecording={this.toggleRecording}
        />
      </View>
    );
  }
}


const portraitStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#d6d2c4',
    justifyContent: 'center'
  },
  header: {
    flex: 2,
    backgroundColor: '#BF5700',
    alignItems: 'center'
  },
  headerText: {
    marginTop: 20,
    color: 'white',
    fontSize: 75
  },
  tempDisplay: {
    flex: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
});

const landscapeStyles = StyleSheet.create({
});
