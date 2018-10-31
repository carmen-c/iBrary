import React from 'react';
import { View, StyleSheet, Text, Flatlist, Button, TouchableOpacity, Image, AppRegistry, Dimensions } from 'react-native';
import {RNCamera} from 'react-native-camera';

import {connect} from 'react-redux';
import {ChangeTab,ChangePage} from '../redux/Actions';


class MyCamera extends React.Component {
  static navigationOptions = {
    header: null,
  };

  navigateToCreatePage=()=>{
    this.props.dispatch(ChangePage(4));
  }  
  
  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };

  render() {
    return (
      <View style={styles.container}>
      
        <Button title='back' onPress={this.navigateToCreatePage}/> 
        
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes)
            }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    paddingTop:76,
    paddingBottom:10,
    width:'100%',
//    backgroundColor:'#e6e6e6',
//    alignContent:'center',
    alignItems:'center',
  },
  titleFont:{
    fontSize:25,
    fontWeight: 'bold',
    color:'#138172'
  },
  takePhoto: {
    width:70,
    height:70,
    borderRadius:35,
    backgroundColor:'#ccc'
  }
 
});

AppRegistry.registerComponent('MyCamera', () => MyCamera);

function mapStateToProps(state){
  return {
    tab:state.Page.tab
  }
}

export default connect (mapStateToProps)(MyCamera);
