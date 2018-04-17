import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, Alert } from 'react-native';


/**
 * This component represents the toolbar at the bottom of our app
 */
export default class Toolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            isRecording: false,
            clearState: false,
            isCelsius: false
        };

        // Bind functions for allowing communication with App.js
        this.toggleConnect = this.toggleConnect.bind(this);
        this.toggleRecording = this.toggleRecording.bind(this);
        this.toggleClear = this.toggleClear.bind(this);
        this.toggleUnits = this.toggleUnits.bind(this);
    }

    /**
     * Allows our main app to pass down new properties, in order to sync app state
     * 
     * @param {Updated properties of our component} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.isConnected !== nextProps.isConnected) {
            this.setState({ isConnected: nextProps.isConnected });
        }
        if (this.state.isRecording !== nextProps.isRecording) {
            this.setState({ isRecording: nextProps.isRecording });
        }
        if (this.state.clearState !== nextProps.clearState) {
            this.setState({ clearState: nextProps.clearState });
        }
        if (this.state.isCelsius !== nextProps.isCelsius) {
            this.setState({ isCelsius: nextProps.isCelsius });
        }
    }

    /**
     * Toggles the device's bluetooth connection state
     */
    toggleConnect() {
        if (this.state.isConnected === false) {
            this.props.toggleConnect('Connecting');
        } else if (this.state.isConnected === true) {
            if (this.state.isRecording) {
                this.props.toggleRecording();
            }
            this.props.toggleConnect(false);
        }
    }

    /**
     * If our device is recording, stop. Otherwise, start recording
     */
    toggleRecording() {
        if (!this.state.isConnected) {
            Alert.alert('Record', 'Connect to ThermActive device first');
        } else {
            this.props.toggleRecording();
        }
    }

    /**
     * Clear's the tempdisplay graph by changing state temporarily, then changing back
     */
    toggleClear() {
        if (this.state.isRecording) {
            Alert.alert('Clear', 'Stop recording first in order to clear');
        } else {
            this.props.toggleClear();
        }
    }

    /**
     * Toggles the device's displayed units between celsius and fahrenheit
     */
    toggleUnits() {
        this.props.toggleUnits();
    }

    /**
     * Creates the connect button component - Toggles text based on state
     */
    getConnectButton() {
        return (
            <View style={styles.iconContainer}>
                <TouchableHighlight underlayColor='#b35000' onPress={ this.toggleConnect } style={styles.touchableHighlight}>
                    <Image
                        style={styles.icon}
                        source={require('../icons/bluetooth.png')}
                    />
                </TouchableHighlight>
                <Text style={styles.iconText}>{this.state.isConnected ? 'Disconnect' : 'Connect'}</Text>
            </View>
        );
    }

    /**
     * Creates the record button component - toggles icon and text based on state
     */
    toggleRecordButton() {
        let imgText = null;
        let img = null;
        if (this.state.isRecording) {
            imgText = 'Stop';
            img = require('../icons/stop.png');
        } else {
            imgText = 'Record';
            img = require('../icons/record.png');
        }
        return (
            <View style={styles.iconContainer}>
                <TouchableHighlight underlayColor='#b35000' onPress={this.toggleRecording} style={styles.touchableHighlight}>
                    <Image
                        style={styles.icon}
                        source={img}
                    />
                </TouchableHighlight>
                <Text style={styles.iconText}>{imgText}</Text>
            </View>
        );
    }

    /**
     * Creates the clear button component
     */
    getClearButton() {
        return (
            <View style={styles.iconContainer}>
                <TouchableHighlight underlayColor='#b35000' onPress={ this.toggleClear } style={styles.touchableHighlight}>
                    <Image
                        style={styles.icon}
                        source={require('../icons/clear.png')}
                    />
                </TouchableHighlight>
                <Text style={styles.iconText}>Clear</Text>
            </View>
        );
    }

    /**
     * Creates the thermometer button component - toggles text (units) based on state
     */
    getThermometerIcon() {
        return (
            <View style={styles.iconContainer}>
                <TouchableHighlight underlayColor='#b35000' onPress={ this.toggleUnits } style={styles.touchableHighlight}>
                    <Image
                        style={styles.icon}
                        source={require('../icons/thermometer.png')}
                    />
                </TouchableHighlight>
                <Text style={styles.iconText}>To °{this.state.isCelsius ? 'F' : 'C'}</Text>
            </View>
        );
    }

    /**
     * Combines each of our icons into a toolbar container to return
     */
    render() {
        return (
            <View style={styles.toolbarContainer}>
                {this.getConnectButton()}
                {this.toggleRecordButton()}
                {this.getClearButton()}
                {this.getThermometerIcon()}
            </View>
        );
    }
}

// CSS styles for our toolbar to make it look pertty
const styles = StyleSheet.create({
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
        fontSize: 10,
        color: 'white',
        marginBottom: 2
    }
});