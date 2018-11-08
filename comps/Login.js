import React from 'react';
import {Image, Button, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';

import {db, auth, auth2} from '../constants/FConfig';

import {connect} from 'react-redux';
import {ChangePage, SavedProfile} from '../redux/Actions';

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
        console.log(thisuser);
//        if(thisuser.img) {
//          pimg = thisuser.img;
//        } else {
//          // put default here
//          pimg = "none";
//        }
//        serid, name, bio, img
        this.props.dispatch(SavedProfile(
          thisuser.userID,
          thisuser.name,
          thisuser.bio,
          pimg
        ))
      
      }).then(()=>{
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
            <TextInput 
                style={[styles.inps]}
                placeholder='E-mail'
                keyboardType='email-address'
                onChangeText={(text) => this.setState({email: text})}/>

            <TextInput 
                style={styles.inps}
                placeholder="Password"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}/>
        </View>
        <View style={styles.butBox}> 
                <TouchableOpacity onPress={this.handleLogin}> 
                    <View style={[styles.signBut]}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </View>
                </TouchableOpacity>
                <GoogleSigninButton
                    style={{ width: 300, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this.signIn}
                    disabled={this.state.isSigninInProgress} />
                <Button
                    style={styles.buttonText}
                    title="Create Account"
                    onPress={this.navigateToPage.bind(this, 3)}
                />
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
    paddingTop:'20%'
  },
  logoImg: {
      marginTop:'5%',
      marginBottom:'5%',
      width:130, 
      height:150, 
      resizeMode:'contain'
  },
  inpBox: {
    flexDirection:'column',
    width:'75%',
    margin:'5%',
    padding:'3%',
    backgroundColor:'#FFF',
    borderRadius:10,
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
  },
  inps:{
    margin:'7%',
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
    name:state.Profile.name,
    bio:state.Profile.bio,
    img:state.Profile.img,
  }
}
export default connect (mapStateToProps)(Login);

