import React from 'react';
import {Image, Button, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';

import * as firebase from 'firebase';
import FConfig from '../constants/FConfig';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';

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
    userInfo: null
  }

  componentDidMount() {
    if(!firebase.apps.length) {
      firebase.initializeApp(FConfig);
    }
  }

  handleLogin=()=>{
    //keep user logged in?
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(a => {
        
    //sign in using email and password
    return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
      this.setState()
//      this.setState({error: error.message})
      
    //navigate to app if there are no errors
    //store token in redux
    //do we need to check for errors??? 
    }).then(u => {
      if(this.state.error === ''){
        this.props.dispatch(ChangePage(4));
      }
    })
      
    })
  }
  
  signIn = async () => {
    
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({ userInfo });
    console.log(userInfo);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
  }
  
  navigateToSignUp=()=>{
    this.props.dispatch(ChangePage(3));
  }
  
  tempNav=()=>{
    this.props.dispatch(ChangePage(4));
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
                    style={{ width: 48, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this.signIn}
                    disabled={this.state.isSigninInProgress} />
                <Button
                    style={styles.buttonText}
                    title="Create Account"
                    onPress={this.navigateToSignUp}
                />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}
export default connect (mapStateToProps)(Login);



const styles = StyleSheet.create({
  container: {
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#e6e6e6'
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
