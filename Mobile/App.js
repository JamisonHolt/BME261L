import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

// Retrieve self-made components
import TempDisplay from './components/tempdisplay';
import Toolbar from './components/toolbar';

/**
 * This component represents our main app, which combines other components into one piece
 */
export default class App extends React.Component {
  
  /**
   * Constructor for our main app - initializes state
   */
  constructor() {
    super();
    this.state = {
      deviceID: null,

      isConnected: false,
      isRecording: false,
      clearState: false,
      isCelsius: false
    }

    // Constant that will always represent the name of our device to find
    this.DEVICE_NAME = 'ThermActive';
  }

  /**
   * Sets necessary bluetooth parameters before the app even loads in order to
   * save time, such as finding the ThermActive device under parings
   */
  componentWillMount() {
    // Make sure BluetoothSerial knows what to count as a datapoint
    BluetoothSerial.withDelimiter('\r\n')
      .then(res => { })
      .catch(res => { });

    // Find any paired ThermActive BT devices to pass into tempdisplay
    BluetoothSerial.list()
      .then((res) => {
        this.setState({
          deviceID: res.find(device => device.name === this.DEVICE_NAME).id
        });
      }).catch((err) => {
        Alert.alert("Bluetooth Error", "Issue listing this phone's paired devices");
      });
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
    return (
      <View style={styles.background}>
        {/* Creates our App Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>ThermActive</Text>
        </View>
        {/* Creates our Temperature Display */}
        <TempDisplay
          style={ styles.tempDisplay }
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
        {/* Creates our Toolbar */}
        <Toolbar
          style={ styles.toolbarDisplay }

          isConnected={ this.state.isConnected }
          isRecording={ this.state.isRecording }
          clearState={ this.state.clearState }
          isCelsius={ this.state.isCelsius }
          toggleConnect={ this.toggleConnect }
        />
      </View>
    );
  }
}

// CSS styles for our app to make it look pertty
const styles = StyleSheet.create({
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
  toolbarDisplay: {
    backgroundColor: '#BF5700',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});