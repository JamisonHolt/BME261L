import React from 'react';
import { StyleSheet, Dimensions, View, Text, ToolbarAndroid} from 'react-native';

import TempDisplay from './components/tempdisplay';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isCelsius: false,
      isPortrait: this.updateIsPortrait(),
      selectedDevice: 'Select a device'
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
        <TempDisplay
          style={styles.tempDisplay}
          isPortrait={ this.state.isPortrait }
        />
        <View style={styles.toolbarContainer}>
          <ToolbarAndroid
            style={styles.toolbar}
            actions={[
              { title: 'Connect', icon: require('./icons/bluetooth.png'), show: 'always' },
              { title: 'Play', icon: require('./icons/play.png' ), show: 'always' },
              { title: 'Delete', icon: require('./icons/delete.png'), show: 'always' }
            ]}
          >
          </ToolbarAndroid>
          <View style={styles.iconTextContainer}>
            <Text style={styles.iconText}>Connect</Text>
            <Text style={styles.iconText}>Record</Text>
            <Text style={styles.iconText}>Delete</Text>          
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
    backgroundColor: '#BF5700'
  },
  toolbar: {
    backgroundColor: '#BF5700',
    height: 56,
    alignSelf: 'stretch',
  },
  iconTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconText: {
    color: 'white',
    marginLeft: 30,
    marginRight: 30,
    marginTop: -10,
    fontSize: 10
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
