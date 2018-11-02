import React from 'react';
import { View, StyleSheet, Text, Flatlist, Button, TouchableOpacity, Image, ScrollView } from 'react-native';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';

class Welcome extends React.Component {

  
  navigatePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
           style={styles.backBut}
           onPress={this.navigatePage.bind(this,1)}> 
              <Image 
                  style={styles.backBut}
                  source={require('../assets/images/backButton.png')}
              />
        </TouchableOpacity>
        <View style={styles.pageTitle}>
            <Text style={styles.titleFont}>Welcome!</Text>
        </View>
        <Text>Browse our features, it will help</Text>
        <View style={styles.box}>
          <Image 
            source={require('../assets/images/sharingIcon.png')}
            style={styles.featureImg}           
          />
            <Text style={styles.featureText}>Share your ideas with people</Text>
        </View>
        <View style={styles.butBox}>
            <TouchableOpacity onPress={this.navigatePage.bind(this,6)}> 
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
  backBut: {
    width:30,
    height:30,
    position:'absolute',
    left:5,
    top:15,
    resizeMode:'contain',
    zIndex:50
  },
  pageTitle: {
    marginTop:76,
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
  box: {
    width:'55%',
    height:300,
    marginTop:'10%',
    marginBottom:'10%',
    paddingTop:'10%',
    paddingLeft:'5%',
    paddingRight:'5%',
    alignContent:'center',
    backgroundColor:"#FFFFFF",
    alignContent:'center',
    borderRadius:20,
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
  },
  featureImg:{
    width:'90%',
    height:150,
    resizeMode:'contain',
    alignContent:'center',
    margin:'5%',
    marginBottom:30
  },
  featureText: {
    textAlign:'center',
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
function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}
 
export default connect (mapStateToProps)(Welcome);