import React from 'react';
import {Image, Button, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';

import {auth, auth2, db} from '../constants/FConfig';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';

class SignUp extends React.Component {

  state={
    email: "",
    password: "",
    password2: "",
    error: "",
    name:"",
    poURl:"",
  }
  navigateToLogIn=()=>{
    this.props.dispatch(ChangePage(1));
  }

  handleSignUp=()=>{
    
    //check if passwords match
    if(this.state.password === this.state.password2) {
      
      //create user
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
        if(this.state.error === ""){
          this.saveNewUserData();
          this.props.dispatch(ChangePage(2));
        }
      }).catch(error => {
        this.setState({error: error.message})
        
      //navigate to welcome screen if there are no errors
      }) 
    }
    
    //if passwords don't match tell the user
    else {
      this.setState({error: "your passwords don't match"})
    }
  }
  
  saveNewUserData=()=> {
  var firebase = require('firebase');
    if (firebase.auth().currentUser) {
      currentUser = firebase.auth().currentUser;
      if (currentUser) {
          firebase.database().ref('users/' + currentUser.uid).set({
              userID: currentUser.uid,
              email: currentUser.email,
             
              
          })
      }
      console.log(currentUser);
    }
  }
  
  render() {
    
    return (
      <View style={styles.container}>
        <TouchableOpacity 
           style={styles.backBut}
         onPress={this.navigateToLogIn}> 
              <Image 
                  style={styles.backBut}
                  source={require('../assets/images/backButton.png')}
                />
        </TouchableOpacity>
        <View style={styles.center}>
          <View style={styles.pageTitle}>
              <Text style={styles.titleFont}>Create Account</Text>
          </View>

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
      </View>
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
  center: {
    alignItems:'center'
  },
  pageTitle: {
    marginTop:65,
    marginBottom:10,
    width:'100%',
    alignItems:'center',
  },
  titleFont:{
    fontSize:25,
    fontWeight: 'bold',
    color:'#138172'
  },
  pageDes:{
    marginBottom:40
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


function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}
export default connect (mapStateToProps)(SignUp);

