import React from 'react';
import { View, StyleSheet, Text, Flatlist, Button, TouchableOpacity, Image } from 'react-native';
import {Camera, Permissions} from 'expo';

import {connect} from 'react-redux';
import {ChangeTab} from '../redux/Actions';

class MyCamera extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state={
        camType:Camera.Constants.Type.front,
        imgsrc:"null",
  }
  changeCamera=()=>{
        if(this.state.camType === Camera.Constants.Type.front ){
            this.setState({
            camType:Camera.Constants.Type.back
            })
        }
        else{
            this.setState({
            camType:Camera.Constants.Type.front
            })
        }

  }
  
  handleImage = async()=>{
        let photo = await this.camera.takePictureAsync();
        console.log(photo);
        this.setState({
            imgsrc:photo.uri
        })
  }
  async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
    }

  navigateToCreatePage=()=>{
    this.props.dispatch(ChangeTab(2));
  }  

  render() {
    return (
      <View style={styles.container}>
      
        <Button title='back' onPress={this.navigateToCreatePage}/>
        <Camera style={{width:'100%', height:'45%'}} type={this.state.camType} ref={ref => { this.camera = ref; }} >
        </Camera>
        <Button 
            onPress={this.changeCamera}
            title='Change Camera'
        />
        
        <TouchableOpacity
          onPress={this.handleImage}>
          <View style={styles.takePhoto}/>
        </TouchableOpacity>
    
        <Image
            style={{width:100, height:100}}
            resizeMode="cover"
            source={{url:this.state.imgsrc}}
            />
      
        
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


function mapStateToProps(state){
  return {
    tab:state.Page.tab
  }
}

export default connect (mapStateToProps)(MyCamera);
