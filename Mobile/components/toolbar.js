import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, Alert } from 'react-native';


/**
 * This component represents the toolbar at the bottom of our app
 */
export default class Toolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCelsius: false,
            isConnected: false,
            isRecording: false,
            deviceID: null
        };

        // Bind functions for allowing communication with App.js
        this.toggleConnect = this.toggleConnect.bind(this);
        this.toggleRecording = this.toggleRecording.bind(this);
        this.clear = this.clear.bind(this);
        this.toggleUnits = this.toggleUnits.bind(this);
    }

    /**
     * Toggles the device's bluetooth connection state
     */
    toggleConnect() {
        this.setState({
            isConnected: !this.state.isConnected
        });
        this.props.toggleConnect();
    }

    /**
     * If our device is recording, stop. Otherwise, start recording
     */
    toggleRecording() {
        if (!this.state.isConnected && !this.state.isRecording) {
            Alert.alert('Record', 'Connect to ThermActive device first');
        } else {
            this.setState({
                isRecording: !this.state.isRecording
            });
            this.props.toggleRecording();
        }
    }

    /**
     * Clear's the tempdisplay graph by changing state temporarily, then changing back
     */
    clear() {
        if (this.state.isRecording) {
            Alert.alert('Clear', 'Stop recording first in order to clear');
        } else {
            this.props.clear();
        }
    }

    /**
     * Toggles the device's displayed units between celsius and fahrenheit
     */
    toggleUnits() {
        this.setState({
            isCelsius: !this.state.isCelsius
        });
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
                <TouchableHighlight underlayColor='#b35000' onPress={ this.clear } style={styles.touchableHighlight}>
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