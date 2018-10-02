import React from 'react';
import {
  Image,
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
TouchableOpacity
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state={
    first: 1
  }
  handleLogin=()=>{
    if(this.state.first == 0){
//      this.setState({ first: 1 })
      this.props.navigation.navigate('Welcome')
      
    } else if(this.state.first == 1){
      this.props.navigation.navigate('Main')
    }
    console.log(this.state)
  }

  render() {
    return (
      <View style={styles.container}>
            <Image 
                source={require('../assets/images/logo.png')}
                style={{width:130, height:150, resizeMode:'contain'}}            
            /> 
        <View style={styles.inpBox}>
            <TextInput 
                style={[styles.inps]}
                placeholder="E-mail"
                keyboardType="default"
                onChangeText={this.handleNum1}/>

            <TextInput 
                style={styles.inps}
                placeholder="Password"
                keyboardType="phone-pad"
                onChangeText={this.handleNum2}/>
        </View>
        <View style={styles.butBox}> 
                <TouchableOpacity onPress={this.handleLogin}> 
                    <View style={styles.signBut}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleLogin}> 
                    <View style={styles.signBut}>
                        <Text style={styles.buttonText}>Continue with Google</Text>
                    </View>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  inpBox: {
    flexDirection:"column",
    width:"75%",
    margin:30,
    padding:20,
    backgroundColor:"#FFF",
    borderRadius:15,
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: "#ccc",
    shadowOpacity: 0.5,
  },
  inps:{
     margin:18,
     borderColor:"#000000",
  },
  buttonText:{
      fontSize:18,
      color:"#fff",
      fontWeight:"300",
  },
  signBut:{
    alignItems:'center',
    margin:5,
    padding:20,
    backgroundColor:"#138172",
    borderRadius:40,
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: "#ccc",
    shadowOpacity: 1,
  },
  butBox: {
    flexDirection:"column",
    width:"80%",
      
  },
});
