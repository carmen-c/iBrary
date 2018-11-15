import React from 'react';
import {Image, Button, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, Alert,ImageBackground, KeyboardAvoidingView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {auth, auth2, db, storage} from '../constants/FConfig';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';

import {connect} from 'react-redux';
import {ChangePage, ChangeTab,SavedProfile} from '../redux/Actions';

import RNFetchBlob from 'rn-fetch-blob';
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class ProfileSetting extends React.Component {
  
  blob=null;
  state={
    name:this.props.name,
    bio:this.props.bio,
    img:this.props.img,
    newImg: {},
    filename: "profileImage",
  }
  navigatePage=(page)=>{
    this.props.dispatch(ChangePage(page), ChangeTab(3));
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
  
  addImgFromGallery = async () => {
    var image = await ImagePicker.openPicker({
      width: 30,
      height: 30,
      compressImageQuality: 0.3,
      cropping: true
    })
    var imgF = await RNFetchBlob.fs.readFile(image.path, "base64");
    var blob = await Blob.build(imgF, {type: 'image/jpg;BASE64'});
    
    this.blob = blob;
    
    this.setState({
      newImg: image,
      filename:image.filename
    });
  }
  
   addImgFromCamera = async () => {
    var image = await ImagePicker.openCamera({
      width: 30,
      height: 30,
      compressImageQuality: 0.3,
      cropping: true
    })
    var photo = await RNFetchBlob.fs.readFile(image.path, "base64");
    var blob = await Blob.build(photo, {type:'image/jpg;BASE64'});
     
    this.blob = blob;
    
    this.setState({
      newImg: image,
      filename:image.filename
    });
  }
  
  saveNewUserData=()=>{
 
    if(this.state.name != "" && this.state.bio !=""){
      var ref = db.ref('users/' + auth.currentUser.uid);
    
    if(Object.keys(this.state.newImg).length != 0) {
      var imgRef = storage.ref().child('profileImages/'+this.props.userid);
      
      imgRef.put(this.blob, {contentType:'image/jpg'}).then((snapshot)=>{
        storage.ref().child(snapshot.metadata.fullPath).getDownloadURL().then((url)=>{
          this.props.dispatch(SavedProfile(this.props.userid, this.state.name, this.state.bio, url));
          
           ref.update({
              name : this.state.name,
              bio: this.state.bio,
              img: url
           });
        })
      });

    } else {
      this.props.dispatch(SavedProfile(this.props.userid, this.state.name, this.state.bio, this.props.img));
      ref.update({
        name : this.state.name,
        bio: this.state.bio,
        img: this.props.img
      });
    }
    console.log(this.props.img);
   
    } else {
      alert('Please enter your name and bio.')
    }
    
//    if (auth.currentUser) {
//            currentUser = auth.currentUser;
//            if (currentUser) {
//                db.ref('users/' + currentUser.uid).update({
//                    name : this.state.name,
//                    bio: this.state.bio,     
//                })
//            }
//      this.props.dispatch(SavedProfile(this.props.userid, this.state.name, this.state.bio, this.props.img));
//    }
//    if(this.state.newImg.data != '') {
//      var imgURL = '';
//      var imgRef = storage.ref().child('profileImages/'+this.props.userid+'.jpg')
      
//      imgRef.putString(this.state.newImg.data, 'base64').then((snapshot)=>{
//        console.log("it might be uploaded?");
//        console.log("A", snapshot.metadata.fullPath);
        
//        storage.ref().child(snapshot.metadata.fullPath).getDownloadURL().then((url)=>{
          
//          this.props.dispatch(SavedProfile(this.props.userid, this.state.name, this.state.bio, url));
//          console.log(url)
          
//          if (auth.currentUser) {
//            currentUser = auth.currentUser;
//            if (currentUser) {
//                db.ref('users/' + currentUser.uid).set({
//                    userID: currentUser.uid,
//                    email: currentUser.email,
//                    name : this.state.name,
//                    bio: this.state.bio, 
//                    img :url
//                })
//            }
//          }
//       })
//      });
//    }
    alert('User Profile is Saved')
  }
    

  logout = async ()=>{
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    auth.signOut().then(()=> {
//      console.log('Signed Out');
      this.props.dispatch(ChangePage(1));
    }).catch(error => {
      console.log(error.message);
    });
  }
    
  render() {
    
    return (
      
      <KeyboardAvoidingView style={{width:'100%'}} behavior="position" enabled>
        <ScrollView style={styles.container}>
          <View style={styles.center}>
            <TouchableOpacity 
             style={styles.backBut}
             onPress={this.navigatePage.bind(this,4)}> 
                <Image 
                  style={styles.backBut}
                  source={require('../assets/images/backButton.png')}
                />
          </TouchableOpacity>
            <View style={styles.pageTitle}>
                <Text style={styles.titleFont}>Profile Setting</Text>
                <Text  style={styles.pageDes}>Create your profile</Text>
            </View>
            

            <View style={{marginBottom:20 }}>
              <TouchableOpacity onPress={this.handleGallery}>
                 <Image
                     style={{width:100, height:100,borderRadius:50, backgroundColor:'#ccc'}}
                    source={{uri: (this.state.newImg.path) ? this.state.newImg.path : this.props.img}}
                  />
                 <Image
                   style={{width:40, height:40, position:'absolute', right:-10, bottom:0}}
                   source={require('../assets/images/edit.png')}/>

                </TouchableOpacity>      
            </View>

            <View style={styles.inpBox}>
              <Text style={styles.sectionTitle}>Name</Text>
              <TextInput 
                    style={[styles.inps]}
                    value={this.state.name}
                    placeholder="name"
                    keyboardType='default'
                    onChangeText={(text) => this.setState({name: text})}/>
             
              <Text style={styles.sectionTitle}>Bio</Text>     
              <TextInput 
                    style={[styles.inps]}
                    value={this.state.bio}
                    placeholder="write something about yourself"
                    keyboardType="default"
                    onChangeText={(text) => this.setState({bio: text})}/>
            </View>
            <View style={[styles.inpBox]}>
              <Text style={styles.sectionTitle}>Social media</Text>
              <TextInput 
                    style={[styles.inps]}
                    placeholder="www.instagram.com/"
                    keyboardType='url'
                    onChangeText={(text) => this.setState({social: text})}/>
            </View>
            <View style={styles.butBox}> 
                <TouchableOpacity onPress={this.saveNewUserData}> 
                    <View style={[styles.signBut]}>
                        <Text style={styles.buttonText}>SAVE</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Button
            title="Logout"
            onPress={this.logout}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    paddingBottom:100
  },
  backBut: {
    width:30,
    height:30,
    position:'absolute',
    left:5,
    top:15,
    resizeMode:'contain',
    zIndex:50
  },
  profileImg:{
    width:100, 
    height:100, 
    borderRadius:50, 
    marginBottom:20
  },
  center: {
    alignItems:'center'
  },
  pageTitle: {
    marginTop:35,
    marginBottom:10,
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
  pageDes:{
    marginTop:10,
    marginBottom:30
  },
  sectionTitle:{
    color:'#8e8f91', 
    fontWeight:'600'
  },
  inpBox: {
    width:'75%', 
    marginBottom:'10%',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'#FFF',
    borderRadius:10,
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
  },
  inps:{
    padding:10,
    borderColor:'#000000',
    
  },
  buttonText:{
    fontSize:17,
    color:'#fff',
    fontWeight:"300",
  },
  signBut:{
    alignItems:'center',
    margin:5,
    padding:15,
    borderRadius:10,
    backgroundColor:'#138172',
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 1,
  },
  butBox: {
    flexDirection:'column',
    width:'80%'  
  },
  red: {
    backgroundColor:'#d34836'
}
});

function mapStateToProps(state){
  return {
    page:state.Page.page,
    tab:state.Page.tab,
    name:state.Profile.name,
    bio:state.Profile.bio,
    img:state.Profile.img,
    Pimg:state.Profile.Pimg,
    userid:state.Profile.userid
  }
}
 
export default connect (mapStateToProps)(ProfileSetting);