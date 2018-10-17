import React from 'react';
import {Image, Button, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';

import * as firebase from 'firebase';
import FConfig from '../constants/FConfig';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';

class SignUp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state={
    email: "",
    password: "",
    password2: "",
    error: "",
  }

  handleSignUp=()=>{
    //check if firebase is already loaded
    if(!firebase.apps.length) {
      firebase.initializeApp(FConfig);
    }
    
    //check if passwords match
    if(this.state.password === this.state.password2) {
      
      //create user
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
        this.setState({error: error.message})
        
      //navigate to welcome screen if there are no errors
      }).then(u => {
        if(this.state.error === ""){
          this.props.dispatch(ChangePage(2));
        }
      }) 
    }
    
    //if passwords don't match tell the user
    else {
      this.setState({error: "your passwords don't match"})
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleLogin}> 
          <View>
              <Text>back button</Text>
          </View>
        </TouchableOpacity>
        
        <Text>Create Account</Text>
        <Text>Sign up with your email address</Text>
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
          
          <TextInput 
                style={styles.inps}
                placeholder="Re-Type Password"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password2: text})}/>
        </View>
        <View style={styles.butBox}> 
                <TouchableOpacity onPress={this.handleSignUp}> 
                    <View style={[styles.signBut]}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleLogin}> 
                    <View style={[styles.signBut,styles.red] }>
                        <Text style={[styles.buttonText]}>SIGN UP WITH Google </Text>
                    </View>
                </TouchableOpacity>
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
export default connect (mapStateToProps)(SignUp);



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
