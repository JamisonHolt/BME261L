import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableHighlight, Image} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

import TempDisplay from './components/tempdisplay';
import Toolbar from './components/toolbar';

// Name of our device - TODO: Change device's name to ThermActive
const DEVICE_NAME = 'HC-06';


/**
 * This component represents our main app, which combines other components into one piece
 */
export default class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      isPortrait: this.updateIsPortrait(),
      isConnected: false,
      isRecording: false,
      clearState: false,
      isCelsius: false,
      deviceID: null
    }
    
    // Bind all callback functions to use in toolbar component
    this.toggleConnect = this.toggleConnect.bind(this);
    this.toggleRecording = this.toggleRecording.bind(this);
    this.toggleClear = this.toggleClear.bind(this);
    this.toggleUnits = this.toggleUnits.bind(this);

    // Make sure BluetoothSerial knows what to count as a datapoint
    BluetoothSerial.withDelimiter('\r\n')
    .then(res => {})
    .catch(res => {});

    // Find any paired ThermActive BT devices to pass into tempdisplay
    BluetoothSerial.list()
    .then((res) => {
      this.setState({
        deviceID: res.find(device => device.name === DEVICE_NAME).id
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

  /**
   * Updates the phone's current orientation state based on the screen dimensions
   */
  updateIsPortrait() {
    const dim = Dimensions.get('screen');
    return dim.width < dim.height;
  }

  /**
   * Toggles the device's bluetooth connection state - passed into toolbar as a callback
   * Bluetooth connection state passed into tempdisplay to decide if recording possible
   */
  toggleConnect(newState) {
    this.setState({
      isConnected: newState
    });
  }

  /**
   * Toggles the device's recording state - passed into toolbar child as callback
   */
  toggleRecording() {
    this.setState({
      isRecording: !this.state.isRecording
    });
  }

  /**
   * Clear's the tempdisplay graph by changing state temporarily, then changing back
   */
  toggleClear() {
    this.setState({
      clearState: !this.state.clearState
    });
  }

  /**
   * Toggles the device's displayed units between celsius and fahrenheit
   */
  toggleUnits() {
    this.setState({
      isCelsius: !this.state.isCelsius
    });
  }

  /**
   * Render's our App's main UI by combining all children nodes
   */
  render() {
    const styles = this.state.isPortrait ? portraitStyles : landscapeStyles;
    return (
      <View style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ThermActive</Text>
        </View>
        <TempDisplay
          style={ styles.tempDisplay }
          isPortrait={ this.state.isPortrait }
          deviceID={ this.state.deviceID }

          isConnected={ this.state.isConnected }
          isRecording={ this.state.isRecording }
          clearState={ this.state.clearState }
          isCelsius={ this.state.isCelsius }
          toggleConnect={ this.toggleConnect }
          toggleRecording={ this.toggleRecording }
          toggleClear={ this.toggleClear }
          toggleUnits={ this.toggleUnits }
        />
        <Toolbar
          isConnected={ this.state.isConnected }
          isRecording={ this.state.isRecording }
          clearState={ this.state.clearState }
          isCelsius={ this.state.isCelsius }
          toggleConnect={ this.toggleConnect }
          toggleRecording={ this.toggleRecording }
          toggleClear={ this.toggleClear }
          toggleUnits={ this.toggleUnits }
        />
      </View>
    );
  }
}

// CSS styles for making our app look good
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
