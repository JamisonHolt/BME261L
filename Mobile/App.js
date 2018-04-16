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
      isCelsius: false,
      deviceID: null
    }
    
    // Bind all callback functions to use in toolbar component
    this.toggleConnect = this.toggleConnect.bind(this);
    this.toggleRecording = this.toggleRecording.bind(this);
    this.clear = this.clear.bind(this);
    this.toggleUnits = this.toggleUnits.bind(this);

    // Find any paired ThermActive BT devices to pass into tempdisplay
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
  toggleConnect() {
    this.setState({
      isConnected: !this.state.isConnected
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
  clear() {
    
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
          style={styles.tempDisplay}
          isPortrait={ this.state.isPortrait }
        />
        <Toolbar
          toggleConnect={this.toggleConnect}
          toggleRecording={this.toggleRecording}
          clear={this.clear}
          toggleUnits={this.toggleUnits}
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
