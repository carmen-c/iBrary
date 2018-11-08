import React from 'react';
import {Image, Button, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';

import {auth, auth2, db} from '../constants/FConfig';
import * as firebase from 'firebase';
import FConfig from '../constants/FConfig';

import {connect} from 'react-redux';
import {ChangePage, ChangeTab,SavedProfile} from '../redux/Actions';

class ProfileSetting extends React.Component {
state={
  name:this.props.name,
  bio:this.props.bio,
}
  navigatePage=(page)=>{
    this.props.dispatch(ChangePage(page), ChangeTab(3));
  }
  saveNewUserData=()=>{
    this.props.dispatch(SavedProfile(this.props.userid, this.state.name, this.state.bio, this.state.img));
    
    alert('save')
    var firebase = require('firebase');
    if (firebase.auth().currentUser) {
      currentUser = firebase.auth().currentUser;
      if (currentUser) {
          firebase.database().ref('users/' + currentUser.uid).set({
              userID: currentUser.uid,
              email: currentUser.email,
              name : this.state.name,
              bio: this.state.bio
              
          })
      }
      console.log(currentUser);
    }

//      firebase.database().ref('users/' + auth.currentUser.uid).set({
//        name : currentUser.name,
//        bio: currentUser.bio
//      })
//      console.log(auth.currentUser);
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
            </View>
            <Text  style={styles.pageDes}>Create your profile</Text>

            <View >
              <Image 
              style={{width:100, height:100, borderRadius:50, marginBottom:20}}
              source={require('../assets/images/profileDefault.png')}
              />
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
    marginTop:65,
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
    marginBottom:30
  },
  inpBox: {
    width:'75%',
    height:'30%',
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
  }
}
 
export default connect (mapStateToProps)(ProfileSetting);