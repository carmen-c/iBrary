import React from 'react';
import {Image, Button, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';

import * as firebase from 'firebase';
import FConfig from '../constants/FConfig';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state={
    email: '',
    password: '',
    error: ''
  }

  handleLogin=()=>{
    //check if firebase is already loaded
    if(!firebase.apps.length) {
      firebase.initializeApp(FConfig);
    }
    
    //keep user logged in
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(a => {
        
    //sign in using email and password
    return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
      this.setState({error: error.message})
      
    //navigate to app if there are no errors
    //store token in redux
    //do we need to check for errors??? 
    }).then(u => {
      if(this.state.error === ''){
        this.props.dispatch(ChangePage(2));
      }
    })
      
    })
  }
  
  navigateToSignUp=(page)=>{
    this.props.dispatch(ChangePage(page));
  }

  render() {
    
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
                onChangeText={this.handleNum1}/>

            <TextInput 
                style={styles.inps}
                placeholder="Password"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={this.handleNum2}/>
        </View>
        <View style={styles.butBox}> 
                <TouchableOpacity onPress={this.handleLogin}> 
                    <View style={[styles.signBut]}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleLogin}> 
                    <View style={[styles.signBut,styles.red] }>
                        <Text style={[styles.buttonText]}>SIGN IN WITH Google </Text>
                    </View>
                </TouchableOpacity>
                <Button
                    style={styles.buttonText}
                    title="Create Account"
                    onPress={this.navigateToSignUp.bind(this, 3)}
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
    marginTop:100,
  },
  logoImg: {
      marginTop:30,
      marginBottom:20,
      width:130, 
      height:150, 
      resizeMode:'contain'
  },
  inpBox: {
    flexDirection:'column',
    width:'75%',
    margin:30,
    padding:20,
    backgroundColor:'#FFF',
    borderRadius:10,
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
  },
  inps:{
    margin:18,
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