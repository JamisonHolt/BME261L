import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';



export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCelsius: false,
            isConnected: false,
            isRecording: false,
            deviceID: null
        };
        this.toggleRecording = this.toggleRecording.bind(this);
    }

    getConnectButton() {
        return (
            <View style={styles.iconContainer}>
                <TouchableHighlight underlayColor='#b35000' onPress={() => this.setState({ isConnected: !this.state.isConnected })} style={styles.touchableHighlight}>
                    <Image
                        style={styles.icon}
                        source={require('../icons/bluetooth.png')}
                    />
                </TouchableHighlight>
                <Text style={styles.iconText}>{this.state.isConnected ? 'Detach' : 'Connect'}</Text>
            </View>
        );
    }

    /**
     * If our device is recording, stop. Otherwise, start recording
     */
    toggleRecording() {
        this.setState({
            isRecording: !this.state.isRecording
        });
        this.props.toggleRecording();
    }

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

    getClearButton() {
        return (
            <View style={styles.iconContainer}>
                <TouchableHighlight underlayColor='#b35000' onPress={() => { }} style={styles.touchableHighlight}>
                    <Image
                        style={styles.icon}
                        source={require('../icons/clear.png')}
                    />
                </TouchableHighlight>
                <Text style={styles.iconText}>Clear</Text>
            </View>
        );
    }

    getThermometerIcon() {
        return (
            <View style={styles.iconContainer}>
                <TouchableHighlight underlayColor='#b35000' onPress={ this.props.updateCelsius } style={styles.touchableHighlight}>
                    <Image
                        style={styles.icon}
                        source={require('../icons/thermometer.png')}
                    />
                </TouchableHighlight>
                <Text style={styles.iconText}>To °{this.state.isCelsius ? 'F' : 'C'}</Text>
            </View>
        );
    }

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
        fontSize: 13,
        color: 'white',
        marginBottom: 2
    }
});