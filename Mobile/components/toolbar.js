import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, Alert } from 'react-native';


/**
 * This component represents the toolbar at the bottom of our app
 */
export default class Toolbar extends React.Component {

    /**
     * Initializes our Toolbar by binding methods (to allow)
     * 
     * @param {Map} props - properties passed from App.js to toolbar.js
     */
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            isRecording: false,
            clearState: false,
            isCelsius: false
        };

        // Bind all state-changing methods of Toolbar in order to use as callback functions
        this.toggleConnect = this.toggleConnect.bind(this);
        this.toggleRecording = this.toggleRecording.bind(this);
        this.toggleClear = this.toggleClear.bind(this);
        this.toggleUnits = this.toggleUnits.bind(this);
    }

    /**
     * Allows our main app to pass down new properties, in order to sync app state. This is called every
     *   time that we update the parent's state, leading to synchronization of state between components
     * 
     * @param {Map} nextProps - Map of Toolbar properties to be updated. Called when parent changes state
     */
    componentWillReceiveProps(nextProps) {
        // Updates connection status
        if (this.state.isConnected !== nextProps.isConnected) {
            this.setState({ isConnected: nextProps.isConnected });
        }
        // Updates recording status
        if (this.state.isRecording !== nextProps.isRecording) {
            this.setState({ isRecording: nextProps.isRecording });
        }
        // Updates "clear state" status, which really doesn't do anything except provide an event to clear our app
        if (this.state.clearState !== nextProps.clearState) {
            this.setState({ clearState: nextProps.clearState });
        }
        // Updates our units status
        if (this.state.isCelsius !== nextProps.isCelsius) {
            this.setState({ isCelsius: nextProps.isCelsius });
        }
    }

    /**
     * Toggles the parent's Bluetooth connection state
     */
    toggleConnect() {
        if (this.state.isConnected === false) {
            // If this device is not connected, start connecting and update status accordingly
            this.props.toggleConnect('Connecting');
        } else if (this.state.isConnected === true) {
            // Otherwise, disconnect
            this.props.toggleConnect(false);
        }
    }

    /**
     * If our device is recording, stop. Otherwise, start recording. Updates parent's state
     */
    toggleRecording() {
        // Make sure user is not confused in case that they try to record without being connected to BT
        if (!this.state.isConnected) {
            Alert.alert('Record', 'Connect to ThermActive device in order to record!');
        }
        this.props.toggleRecording();
    }

    /**
     * Update's parent's clear state, which trigger's the chart's clear method
     */
    toggleClear() {
        this.props.toggleClear();
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
            <View style={this.props.style}>
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