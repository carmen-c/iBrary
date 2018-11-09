import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import {auth, db, storage} from '../constants/FConfig';

import {connect} from 'react-redux';
import {ChangeTab, ChangePage} from '../redux/Actions';

//import ImagePicker from 'react-native-image-picker';


class CreatePost extends React.Component {
  
  state={
    title: "",
    content: "",
    tags: "",
    img: {},
    imgURL: "",
    filename: "",
    postid: "",
  }
handleGallery=()=>{
    Alert.alert(
      'Change Profile Picture',
      'Where do you want to get the picture?',
      [
        {text: 'Camera', onPress: () => this.addImgFromCamera()},
        {text: 'Gallery', onPress: () => this.addImgFromGallery()},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: true }
    )
  }

  

  //user image picker and set image as state
  addImgFromGallery = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: true
    }).then(image => {
      this.setState({
        img: image
      });
      this.setState({
        filename: image.filename
      });
      console.log("chosen image:", this.state.img);
    });
  }
  
   addImgFromCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: true
    }).then(image => {
      this.setState({img: image.data});
      this.setState({filename: image.filename});
      console.log("chosen image:", this.state.img);
    });
  }

  createNewPost =()=>{
    var newPostKey = db.ref().child('posts').push().key;
    var current = auth.currentUser.uid;
    var date = new Date().toUTCString();
    var timestamp = new Date().getTime();
    var imgURL = "";
    
    if(this.state.img != "") {
      var imgRef = storage.ref().child('postImages/'+newPostKey+"/"+this.state.filename+'.jpg');
    
        imgRef.putString(this.state.img.data, 'base64').then((snapshot)=>{
        console.log("it might be uploaded?");
        console.log("A", snapshot.metadata.fullPath);
        
        storage.ref().child(snapshot.metadata.fullPath).getDownloadURL().then((url)=>{
          imgURL = url;
          console.log("image url: ",url);
          console.log(imgURL);
          
          this.writeNewPost(current, newPostKey, date, this.state.title, this.state.content, timestamp, this.props.name, imgURL);
        })

      });
    } else {
      this.writeNewPost(current, newPostKey, date, this.state.title, this.state.content, timestamp, this.props.name, imgURL);
    }
  }
  
  writeNewPost=(uid, postid, date, title, content, timestamp, name, imgURL)=>{
    db.ref('posts/' + postid).set({
        userID: uid,
        postID: postid,
        date: date,
        title: title,
        content: content,
        timestamp: timestamp,
        username: name,
        img: imgURL
    })
  }
  
  navigatePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }; 
  
  render() {
    
    return (
      <ScrollView style={{width:'100%',backgroundColor:'#fff'}}>
      <View style={styles.container}>
        <View style={styles.pageTitle}>
            <Text style={styles.titleFont}>Create an Idea</Text>
        </View>
        <View style={styles.boxes}>          
              <TouchableOpacity onPress={this.handleGallery}>
                <Image 
                  source={(this.state.img.path) ? {uri: this.state.img.path} : require('../assets/images/robot-dev.png')}
                  style={styles.imgIcon}
                  />
              </TouchableOpacity>
         
        </View>
        <View style={[styles.items, styles.title]}>
          <TextInput
              placeholder='Title'
              onChangeText={(text)=> this.setState({title: text})}
          />
        </View>
        <View style={styles.hairline} />
        <View style={[styles.items, styles.content]}>
           <TextInput
              placeholder='Content'
              multiline={true}
              onChangeText={(text)=> this.setState({content: text})}
            />  
        </View> 
        <View style={styles.hairline} />
        
        <View style={[styles.items, styles.hashtag]}>
            <TextInput
              placeholder='select the categoty'
              onChangeText={(text)=> this.setState({tags: text})}

            />
        </View>
        <View style={styles.butBox}> 
            <TouchableOpacity onPress={this.createNewPost}> 
                    <View style={[styles.signBut]}>
                        <Text style={styles.buttonText}>POST</Text>
                    </View>
            </TouchableOpacity>
       </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',   
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.6,
    width: '100%'
  },
  verticalHairline:{
    backgroundColor: '#A2A2A2',
    height: 150,
    width: 0.5
  },
  pageTitle: {
    paddingTop:35,
    paddingBottom:30,
    width:'100%',
    backgroundColor:'#e6e6e6',
//    alignContent:'center',
    alignItems:'center',
    
  },
  titleFont:{
    fontSize:25,
    fontWeight: 'bold',
    color:'#138172'
  },
  boxes: {
    alignItems:'center',
    width:'100%',
    margin:10,
  },
  box: {
    width:'50%',
    paddingLeft:'15%',
    paddingRight:'15%',
    height:150,
    backgroundColor:"#F2F2F2",
    alignContent:'center',
    justifyContent:'center'
  },
  items: {
    width:'100%',
    padding:10,
  },
  title: {
    height:'10%'  
  },
  content: {
    height:'30%' 
  },
  hashtag: {
    height:'10%',
    marginBottom:'5%'
  },
  buttonText:{
    fontSize:17,
    color:"#fff",
    fontWeight:"300",
  },
  signBut:{
    alignItems:'center',
    margin:5,
    padding:15,
    borderRadius:10,
    backgroundColor:"#138172",
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: "#ccc",
    shadowOpacity: 1,
  },
  butBox: {
    flexDirection:"column",
    width:"80%"  
  },
  imgIcon:{
    width:120,
    height:120,
    
  }
});

function mapStateToProps(state){
  return {
    page:state.Page.page,
    name:state.Profile.name
  }
}

export default connect (mapStateToProps)(CreatePost);

