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
 	TouchableHighlight,
 	ScrollView,
 	Image,
 	CameraRoll,
 	NativeModules,
 } = React;

 var dgvb = React.createClass({
 	getInitialState: function() {
 		return {
 			cameraType: Camera.constants.Type.back,
 			images: [],
 			selected: '',
 		};
 	},

 	componentDidMount: function() {
 		var fetch = {
 			first: 25, //photos from roll
 		};
 		CameraRoll.getPhotos(fetch, this._storePhotos, this._logImageError);
 	},

 	_storePhotos: function(data) {
 		var assets = data.edges;
 		var images = assets.map((asset) => asset.node.image);
 		this.setState({
 			images: images,
 		});
 	},

 	_logImageError: function(err) {
 		console.log(err);
 	},

 	_selectImage: function(uri) {
 		NativeModules.ReadImageData.readImage(uri, (image) => {
 			this.setState({
 				selected: image,
 			});
 			console.log(image);
 		});
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
 	},

 	render: function() {
 		return (
 			<ScrollView style={styles.scrollViewContainer}>
 				<View style={styles.imageGrid}>
 				{ this.state.images.map((image) => {
 					return (
 						<TouchableHighlight key={image.key} onPress={this._selectImage.bind(null, image.uri)}>
 						<Image style={styles.image} source={{ uri: image.uri }} />
 						</TouchableHighlight>
 					);
 					})
 				}
 				</View>
 			</ScrollView>
 		
 			/*
 			<Camera
 			ref="cam"
 			style={styles.cameraContainer}
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
 			*/
 		);
 	},
 	
 });

var styles = StyleSheet.create({
	scrollViewContainer: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	cameraContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	imageGrid: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	image: {
		width: 100,
		height: 100,
		margin: 10,
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
