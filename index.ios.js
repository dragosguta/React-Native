/**
 * Dragos Guta
 * Varatep Buranintu
 */
 'use strict';

 var React = require('react-native');
 var Camera = require('react-native-camera');
 var {
 	AppRegistry,
 	StyleSheet,
 	Text,
 	View,
 	TouchableHighlight
 } = React;

 var dgvb = React.createClass({
 	getInitialState: function() {
        return {
            cameraType: Camera.constants.Type.back
        }
    },
 
    render: function() {
        return (
            <Camera
                ref="cam"
                style={styles.container}
                type={this.state.cameraType}>
                <View style={styles.buttonBar}>
                    <TouchableHighlight style={styles.button} onPress={this._switchCamera}>
                        <Text style={styles.buttonText}>Flip Camera</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this._takePicture}>
                        <Text style={styles.buttonText}>Take Picture</Text>
                    </TouchableHighlight>
                </View>
            </Camera>
        );
    },
 
    _switchCamera: function() {
        var state = this.state;
        state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
        this.setState(state);
    },
 
    _takePicture: function() {
        this.refs.cam.capture(function(err, data) {
            console.log(err, data);
        });
    }
 
});
 
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    buttonBar: {
        flexDirection: "row",
        position: "absolute",
        bottom: 25,
        right: 0,
        left: 0,
        justifyContent: "center"
    },
    button: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        margin: 5
    },
    buttonText: {
        color: "#FFFFFF"
    }
});


AppRegistry.registerComponent('dgvb', () => dgvb);
