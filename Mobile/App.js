import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button, Picker } from 'react-native';

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
        <View style={styles.button} >
          <Button
            title="Change to Celsius"
            color="#BF5700"
            style={styles.button}
            onPress={() => {
              this.setState({
                isCelsius: !(this.state.isCelsius)
              });
            }}
          />
          <View style={styles.bluetooth} >
            <View style={styles.blueToothDropdown} >
              <Picker 
                selectedValue={this.state.selectedDevice}
                style={{ backgroundColor: "#BF5700"}}
                itemStyle={{ color: '#BF5700'}}
                onValueChange={(itemValue, itemIndex) => this.setState({selectedDevice: itemValue})}
                >
                <Picker.Item label='Select a device' value={null} />                
                <Picker.Item label='00:21:13:01:1C:51' value='00:21:13:01:1C:51' />
              </Picker>
            </View>
            <View style={styles.blueToothButton} >
              <Button
                title="Connect"
                color="#BF5700"           
                onPress={() => {}}   
              />
            </View>
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
  bluetooth: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blueToothDropdown: {
    flex: 2,
    marginRight: 5
  },
  blueToothButton: {
    flex: 1,
  },
  button: {
    margin: 20,
    marginBottom: 0,
    flex: 3,
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
    marginTop: 20,
    flex: 1,
    flexDirection: 'row'
  },
  tempDisplay: {
    flex: 10,
    backgroundColor: '#333F48',
  },
});
