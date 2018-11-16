import React from 'react';
import {Image, Button, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import {db, auth, auth2} from '../constants/FConfig';

import {connect} from 'react-redux';
import {ChangePage, SavedProfile, ChangeTab} from '../redux/Actions';

import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';
import GConfig from '../constants/GConfig';

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state={
    email: '',
    password: '',
    error: '',
    name:'',
    bio:'',
    img:'',
    uid:'',
  }
  
  componentWillMount=()=>{
    auth.onAuthStateChanged(user=> {
      if (user) {
        // User is signed in.
        this.handleUserInfo(user);
      } else {
        // No user is signed in.
      }
    });  
  }
  
  componentWillUnMount=()=>{
    //have to put something here to get rid of warning
  }
  
  handleLogin=()=>{
    //keep user logged in?
    auth.setPersistence(auth2.Auth.Persistence.LOCAL).then(a => {
      
    //sign in using email and password
    return auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => {
        this.handleUserInfo(auth.currentUser);
    }).catch(error => {
      this.setState({error: error.message})
      
    //navigate to app if there are no errors
    })
      
    })
  }
  
  signIn = async () => {
    await GoogleSignin.signIn().then((user)=>{
      const credential = auth2.GoogleAuthProvider.credential(user.idToken, user.accessToken);
      auth.signInAndRetrieveDataWithCredential(credential);
      this.handleUserInfo(auth.currentUser);
      this.navigateToPage.bind(this, 4);
      
    }).catch((error) =>{
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        this.setState({error: error.message})
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.setState({error: error.message})
      } else {
        // some other error happened
      }
    });
  }
  
  handleUserInfo=(user)=>{
    if(user.uid != null){
    db.ref('users/'+ user.uid)
      .once('value')
      .then(snapshot => {
        var thisuser = snapshot.val();
        var pimg = "";
      
        if(thisuser.img == "") {
          pimg = 'require("../assets/images/profileDefault.png")'
          
        } else {
          pimg = thisuser.img
        }

        console.log(thisuser);
//        serid, name, bio, img
        this.props.dispatch(SavedProfile(
          thisuser.userID,
          thisuser.name,
          thisuser.bio,
          pimg
        ))
      
      }).then(()=>{
      this.props.dispatch(ChangeTab(1))
        this.navigateToPage(4);
      });
    } else {}
  }
  
  navigateToPage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }

  render() {
    
    GoogleSignin.configure(GConfig);
    
    return (
      <View style={styles.container}>
        <Image 
            source={require('../assets/images/logo.png')}
            style={styles.logoImg}            
        /> 
        
        <View>
          <Text>{this.state.error}</Text>
        </View>
        
        <View style={styles.inpBox}>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <Image 
              source={require('../assets/images/userID.png')}
              style={{width:20,height:20, marginTop:10,opacity:0.6}}            
            /> 
            <TextInput 
                style={[styles.inps,styles.font]}
                placeholder='E-mail'
                keyboardType='email-address'
                onChangeText={(text) => this.setState({email: text})}/>
          </View>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <Image source={require('../assets/images/password.png')}
              style={{width:20,height:25, marginTop:10,resizeMode:'contain',opacity:0.6}}            
            /> 
            <TextInput 
                style={[styles.inps,styles.font]}
                placeholder="Password"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}/>
          </View>
        </View>
        
        <View style={styles.butBox}> 
          
          <TouchableOpacity onPress={this.handleLogin}> 
              <View style={[styles.signBut]}>
                  <Text style={[styles.buttonText,styles.font]}>SIGN IN</Text>
              </View>
          </TouchableOpacity>
          
          <GoogleSigninButton
              style={{ width: '100%', height: 50, borderRadius:10}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress} />
          
          <TouchableOpacity style={{alignItems:'center'}} onPress={this.navigateToPage.bind(this, 3)}>
            <Text style={[styles.creactAccount, styles.font]}>
              Create Account
            </Text>
          </TouchableOpacity>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#e6e6e6',
    ...ifIphoneX({
            paddingTop:'40%',
        }, {
            paddingTop:'20%',
        })
  },
  logoImg: {   
      marginBottom:'5%',
      width:130, 
      height:150, 
      resizeMode:'contain',
      ...ifIphoneX({
              marginTop:'15%',
          }, {
              marginTop:'5%',
          })
  },
  inpBox: {
    flexDirection:'column',
    width:'77%',
    margin:20,
    padding:15,
    paddingLeft:25,
    backgroundColor:'#FFF',
    borderRadius:10,
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
  },
  inps:{
    margin:15,
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
  },
  creactAccount:{
    marginTop:10, 
    fontSize:15, 
    fontWeight:'600', 
    color:'#676767'
  },
  font:{
    fontFamily:'Avenir'
  }
});

function mapStateToProps(state){
  return {
    page:state.Page.page,
    name:state.Profile.name,
    bio:state.Profile.bio,
    img:state.Profile.img,
  }
}
export default connect (mapStateToProps)(Login);

