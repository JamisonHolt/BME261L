import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableHighlight, Image} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Drawer from 'react-native-drawer';

import ControlPanel from './components/control-panel.js';
import TempDisplay from './components/tempdisplay';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isCelsius: false,
      isPortrait: this.updateIsPortrait(),
      isRecording: false,
      displayDevices: false,
      selectedDevice: null,
      devices: []
    }

    // Find and store bluetooth devices that have been paired
    BluetoothSerial.list()
    .then((res) => {
      this.setState({
        devices: res
      });
      console.log(res);
    }).catch((err) => {
      console.log("Issue Listing Paired devices");
    });

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

  getStopPlayButton() {
    const styles = this.state.isPortrait ? portraitStyles : landscapeStyles;    
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

  renderDeviceMenu() {
    const styles = this.state.isPortrait ? portraitStyles : landscapeStyles;
    return (
      <Drawer
        type="static"
        content={<ControlPanel />}
        openDrawerOffset={100}
        styles={drawerStyles}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <Text>Test</Text>
      </Drawer>
    );
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
        {/* TODO: Add all icon actions */}
        <View style={styles.toolbarContainer}>
          <View style={styles.iconContainer}>
            <TouchableHighlight underlayColor='#b35000' onPress={() => this.setState({displayDevices: !this.state.displayDevices})} style={styles.touchableHighlight}>
              <Image
                style={styles.icon}
                source={require('./icons/bluetooth.png')}
              />
            </TouchableHighlight>
            <Text style={styles.iconText}>Device</Text>
          </View>
          {this.getStopPlayButton()}
          <View style={styles.iconContainer}>
            <TouchableHighlight underlayColor='#b35000' onPress={() => { }} style={styles.touchableHighlight}>
              <Image
                style={styles.icon}
                source={require('./icons/clear.png')}
              />
            </TouchableHighlight>
            <Text style={styles.iconText}>Clear</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableHighlight underlayColor='#b35000' onPress={() => { }} style={styles.touchableHighlight}>
              <Image
                style={styles.icon}
                source={require('./icons/thermometer.png')}
              />
            </TouchableHighlight>
            <Text style={styles.iconText}>To °{this.isCelsius ? 'F' : 'C'}</Text>
          </View>
        </View>
        {this.state.displayDevices ? this.renderDeviceMenu() : null}                
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
    marginTop: 7
  },
  icon: {
    height: 30,
    width: 30,
    marginTop: 5
  },
  iconText: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 16,
    color: 'white',
    marginBottom: 2
  },
  devicesContainer: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#BF5700FF',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'white'
  },
  deviceListing: {
    color: 'white',
    margin: 10,
    fontSize: 30
  },
  deviceContainerTitle: {
    color: 'white',
    margin: 10,
    fontSize: 35,
  },
  thickUnderline: {
    borderBottomColor: 'white',
    borderBottomWidth: 3,
    width: 350
  },
  thinUnderline: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: 350
  },
  tempDisplay: {
    flex: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
});

const landscapeStyles = StyleSheet.create({
});
