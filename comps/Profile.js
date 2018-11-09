import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import {db, auth,auth2} from '../constants/FConfig';
import * as firebase from 'firebase';

import {connect} from 'react-redux'; 
import {ChangePage} from '../redux/Actions';



class Profile extends React.Component {
  state={
    error:"",
    arrData: [],
    userN:'',
    bio:'',
    img:''

  }
  static navigationOptions = {
    title: 'Profile',
  };
  navigatePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  readProfile=()=>{
    var firebase = require('firebase');
    currentUser = firebase.auth().currentUser;
      if (currentUser) {
//+currentUser.uid
        db.ref('users/'+currentUser.uid).once('value').then(snapshot =>{
//           var items = []; 
          var user = snapshot.val(); 
          this.setState({
            userN:user.name,
            bio:user.bio,
            img:user.img
          })

    
//          console.log(this.state.userN, this.state.bio);
        }).catch(error => {
          this.setState({error: error.message})
        });
    
      }
  }
  render() {
    this.readProfile();
    return (
      <View style={styles.container}>
         <View style={styles.pageTitle}>
            <Text style={styles.titleFont}>Profile</Text>
        </View>
        <TouchableOpacity style={{position:'absolute', top:15, right:15}}onPress={this.navigatePage.bind(this,7)}>
          <Image 
                  source={require('../assets/images/camera.png')}
                  style={{width:40, height:40}}
                  />
        </TouchableOpacity>
        <View style={styles.section}>  
            <View style={styles.box1}>
             {/* <Image 
                source={require('../assets/images/profile.jpg')}
                style={styles.profile}            
              />
            */}
              <Image 
                source={{ uri: this.state.img }}
                style={styles.profile}            
              /> 
            </View>
            <View style={styles.box1}>
              <Text>{this.state.error}</Text>
              <Text style={{fontWeight:'bold', fontSize:25, marginBottom:5}}>{this.state.userN}</Text>
              <Text>{this.state.bio}</Text>
            </View>
        </View>
        <View style={styles.hairline} />
        <View style={styles.section}>
           <Text>Interest</Text>
        </View>
        <View style={styles.hairline} />
          <View style={styles.section}>
             <Text>Social Media</Text>
          </View>
        <View style={styles.hairline} />
        <View style={styles.section}>
           <Text>Ideas</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    backgroundColor: '#e6e6e6',
    flexDirection: 'column'
 
  },
  pageTitle: {
    paddingTop:40,
    paddingBottom:30,
    width:'100%',
    backgroundColor:'#e6e6e6',
//    alignContent:'center',
    alignItems:'center',
  },
  titleFont:{
    fontSize:25,
    fontWeight: 'bold',
    color:'#138172'
  },
  section: {
    width:'100%',
    paddingLeft:15,
    paddingTop:5,
    paddingBottom:5,
//    flex:1,
    flexDirection:'row'
  },
  box1: {
    height:'40%',
//    backgroundColor:'pink',
    marginTop:5,
    paddingBottom:'5%'
  },
  profile: {
    width:80,
    height:80,
    resizeMode:'cover',
    borderRadius:40,
    marginRight:20
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.3,
    width: '100%'
},
});
function mapStateToProps(state){
  return {
    page:state.Page.page,
    img:state.Profile.img,
  }
}
 
export default connect (mapStateToProps)(Profile);
