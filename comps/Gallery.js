import React from 'react';
import { View, StyleSheet, Text, Flatlist, Button, TouchableOpacity, Image, AppRegistry, Dimensions, ScrollView, CameraRoll,TouchableHighlight } from 'react-native';
import {RNCamera} from 'react-native-camera';

import {connect} from 'react-redux';
import {ChangeTab,ChangePage} from '../redux/Actions';


class Gallery extends React.Component {
   state={
    photos:[],
    index: null
  }
  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }
  

  _handleGallery = () => {
   CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
   };
  navigatePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  selectImage=()=>{
    
  }

  render() {
    var width = Dimensions.get('window').width;
    this._handleGallery();
    return (
      <View>
        <Button title='Back' onPress={this.navigatePage.bind(this,4)}/> 
        <View style={styles.galTitle}>
           <Text style={styles.titleFont}>Gallery</Text>
        </View>
       
        
        <View style={styles.container}> 
        <ScrollView contentContainerStyle={styles.scrollView}>
           
           {this.state.photos.map((p, i) => {
           return (
             <TouchableHighlight
                      style={{opacity: i === this.state.index ? 0.5 : 1}}
                      key={i}
                      underlayColor='transparent'
                      onPress={() => this.setIndex(i)}
                    >
             <Image
               key={i}
               style={{
                 width: width/3,
                 height: width/3,
               }}
               source={{ uri: p.node.image.uri }}
             />
            </TouchableHighlight>
           );
         })}
            
        </ScrollView> 
          {
              this.state.index !== null  && (
                <View style={{width:width, alignItems:'center'}}>
                <TouchableOpacity style={[styles.signBut, {width:width*0.8, }]} onPress={this.selectImage}> 
                
                        <Text style={styles.buttonText}>NEXT</Text>
                  
                </TouchableOpacity>
                </View>
              )
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex:1,
  },
  signBut:{
    position: 'absolute',
    alignItems:'center',
    bottom: 15,
    margin:5,
    padding:15,
    borderRadius:10,
    backgroundColor:"#138172",
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: "#ccc",
    shadowOpacity: 1,
  },
  galTitle: {
    paddingTop:10,
    paddingBottom:10,
    alignItems:'center',
  },
  titleFont:{
    fontSize:20,
    fontWeight: 'bold',
    color:'#138172'
  },
  takePhoto: {
    width:70,
    height:70,
    borderRadius:35,
    backgroundColor:'#ccc'
  },
  preview:{
    width:'100%',
    height:'45%'
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  shareButton: {
    position: 'absolute',
    width:100,
    padding: 10,
    bottom: 0,
    left: 0
  },
  buttonText:{
    fontSize:17,
    color:"#fff",
    fontWeight:"300",
  },
  
  butBox: {
    flexDirection:"column",
    width:"80%"  
  },
 
});



function mapStateToProps(state){
  return {
    tab:state.Page.tab
  }
}

export default connect (mapStateToProps)(Gallery);
