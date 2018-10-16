import React from 'react';
import { View, StyleSheet, Text, Flatlist, Button, TouchableOpacity } from 'react-native';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title='back'></Button>
        <View style={styles.pageTitle}>
            <Text style={styles.titleFont}>Welcome!</Text>
        </View>
        <Text>Browse our features, it will help</Text>
        <View style={styles.box}>
            <Text style={styles.featureText}>Share your ideas with people</Text>
        </View>
        <View style={styles.butBox}>
            <TouchableOpacity onPress={this.handleLogin}> 
                <View style={[styles.signBut] }>
                    <Text style={[styles.buttonText]}>GET STASRTED </Text>
                </View>
            </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    flex:1,
    alignItems: 'center',
  },
  pageTitle: {
    paddingTop:76,
    paddingBottom:10,
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
  box: {
    width:'55%',
    height:300,
    marginTop:'20%',
    marginBottom:'20%',
    padding:'5%',
    alignContent:'center',
    backgroundColor:"#FFFFFF",
    alignContent:'center',
    justifyContent:'center',
    borderRadius:20,
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
  },
  featureText: {
    textAlign:'center' 
  },
  butBox: {
    flexDirection:'column',
    width:'80%',
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
});

