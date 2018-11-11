import React from 'react';
import {Image, Button, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, Alert,ImageBackground} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {auth, auth2, db, storage} from '../constants/FConfig';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';

import {connect} from 'react-redux';
import {ChangePage, ChangeTab,SavedProfile} from '../redux/Actions';

class ProfileSetting extends React.Component {
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
  
  addImgFromGallery=()=>{
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: true
    }).then(image => {
      this.setState({
        newImg: image
      });
//      this.setState({filename: image.filename});
      console.log("chosen image:", this.state.newImg);
    });
  }
  
  addImgFromCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: true
    }).then(image => {
      this.setState({newImg: image.data});
      this.setState({filename: image.filename});
      console.log("chosen image:", this.state.img);
    });
  }
  
  saveNewUserData=()=>{
    
    if (auth.currentUser) {
            currentUser = auth.currentUser;
            if (currentUser) {
                db.ref('users/' + currentUser.uid).set({
                    userID: currentUser.uid,
                    email: currentUser.email,
                    name : this.state.name,
                    bio: this.state.bio,     
                })
            }
      this.props.dispatch(SavedProfile(this.props.userid, this.state.name, this.state.bio, this.props.img));
    }
    if(this.state.newImg.data != '') {
      var imgURL = '';
      var imgRef = storage.ref().child('profileImages/'+this.props.userid+'.jpg');
    
      imgRef.putString(this.state.newImg.data, 'base64').then((snapshot)=>{
//        console.log("it might be uploaded?");
        console.log("A", snapshot.metadata.fullPath);
        
        storage.ref().child(snapshot.metadata.fullPath).getDownloadURL().then((url)=>{
          
          this.props.dispatch(SavedProfile(this.props.userid, this.state.name, this.state.bio, url));
//          console.log(url)
          
          if (auth.currentUser) {
            currentUser = auth.currentUser;
            if (currentUser) {
                db.ref('users/' + currentUser.uid).set({
                    userID: currentUser.uid,
                    email: currentUser.email,
                    name : this.state.name,
                    bio: this.state.bio, 
                    img :url
                })
            }
          }
       })
      });
    }
    
    alert('User Profile is Saved')
  }
    
//    if(user.img === null){
//      db.ref('users/' + currentUser.uid).set({
//        img:
//      })
//    }
    
//    var firebase = require('firebase');
    
//      console.log(currentUser);
//    }

//      firebase.database().ref('users/' + auth.currentUser.uid).set({
//        name : currentUser.name,
//        bio: currentUser.bio
//      })
//      console.log(auth.currentUser);
//  }
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
            

            <View >
              <TouchableOpacity onPress={this.handleGallery}>
               <Image
                   style={{width:100, height:100,borderRadius:50, backgroundColor:'#ccc'}}
                  source={{uri: (this.state.newImg.path) ? this.state.newImg.path : this.props.img}}
                />
                  
                  <View sytle={{width:100, height:100,borderRadius:50, marginBottom:20, alignItem:'center'}}>
                    <Text style={{fontSize:20}}>+</Text>
                  </View>
                    
                 
      
                
        </TouchableOpacity>
           
              
            </View>

            <View style={styles.inpBox}>
              <TextInput 
                    style={[styles.inps]}
                    value={this.state.name}
                    placeholder="name"
                    keyboardType='default'
                    onChangeText={(text) => this.setState({name: text})}/>
                    
              <TextInput 
                    style={[styles.inps]}
                    value={this.state.bio}
                    placeholder="write something about yourself"
                    keyboardType="default"
                    onChangeText={(text) => this.setState({bio: text})}/>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
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
  inpBox: {
    width:'75%', 
    marginBottom:'10%',
    padding:'3%',
    backgroundColor:'#FFF',
    borderRadius:10,
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
  },
  inps:{
    padding:18,
    borderColor:'#000000',
    height:50
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