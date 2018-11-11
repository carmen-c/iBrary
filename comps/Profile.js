import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground, TouchableOpacity, FlatList, TextInput,ListItem, ScrollView } from 'react-native';
import {db, auth,auth2} from '../constants/FConfig';
import * as firebase from 'firebase';

import {connect} from 'react-redux'; 
import {ChangePage,SavedProfile} from '../redux/Actions';
import Post from './Post';



class Profile extends React.Component {
  state={
    error:"",
    arrData: [],
    userN:'',
    bio:'',
    img:'',
    uid:this.props.userid

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

   
//          console.log(this.state.img);
        }).catch(error => {
          this.setState({error: error.message})
        });
    
      }
    
  }
  
  componentWillMount=()=>{
    this.readPosts();
  }
  readPosts=()=>{
    db.ref('posts/')
      .limitToLast(100)
      .once('value')
      .then(snapshot => {
      var items = [];
      
      snapshot.forEach(child =>{
        items.unshift({
          key: child.val().postID,
          userID:child.val().userID,
          title: child.val().title,
          content: child.val().content,
          date: child.val().date,
          username: child.val().username,
          img:child.val().img
        })
      });
     
      this.setState({arrData: items})
      
      //filter posting with uid
      var newResult = this.state.arrData.filter((post)=>{
      var matchThis = new RegExp(this.props.userid, 'g');
        var arr = post.userID.match(matchThis);
      return arr;
      })
      this.setState({
      arrData:newResult
      })     
      console.log(this.state.arrData)
    }).catch(error => {
      this.setState({error: error.message})
    });
  }
  
  renderList=({item}) =>  {
    return(
      <Post 
       title={item.title} 
       content={item.content} 
       userID={item.userID}
       postid={item.key}
       username={item.username}
       img={item.img}
       />
    )
  }
  render() {
    this.readProfile();
    return (
      <View style={styles.container}>
         <View style={styles.pageTitle}>
            <Text style={styles.titleFont}>Profile</Text>
        </View>
        <TouchableOpacity style={{position:'absolute', top:30, right:5, width:35, height:35}}onPress={this.navigatePage.bind(this,7)}>
          <Image 
                  source={require('../assets/images/setting.png')}
                  style={{width:25, height:25}}
                  />
        </TouchableOpacity>
        <ScrollView style={{width:'100%'}}>
        <View style={styles.section}>  
            <View style={styles.box1}>
              <Image 
                source={(this.state.img) ? { uri: this.state.img} : require('../assets/images/profileDefault.png')}
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
          
        <View style={styles.section2}>
          <Text style={styles.sectionTitle}>Interest</Text>
          <View style={{flexDirection:'row', paddingLeft:10}}>
            <View style={styles.interestList}><Text style={{color:'white'}}>List1</Text></View>
            <View style={styles.interestList}><Text style={{color:'white'}}>List2</Text></View>            
          </View>     
          
        </View>
          <View>
        <View style={styles.hairline} />
          </View>
        <View style={styles.section2}>
           <Text style={styles.sectionTitle}>Social Media</Text>
        </View>
         <View style={styles.hairline} /> 
       
          
        <View style={styles.section2}>
         <Text style={styles.sectionTitle}>Ideas</Text>
          <View style={{width:'95%', marginBottom:50}}>
            <FlatList
              extraData={this.state.arrData}
              data={this.state.arrData}
              keyExtractor={item => item.key}
              renderItem={this.renderList}
            />
          </View>
          
        </View>
       </ScrollView>
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
    paddingTop:35,
    paddingBottom:5,
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
    flexDirection:'row',
    width:'100%',
    paddingLeft:15,
    paddingTop:5,
    paddingBottom:5,
  },
  section2: {
    width:'100%',
    paddingLeft:15,
    paddingTop:7,
    paddingBottom:10,
  },
  sectionTitle:{
    fontSize:16,
    fontWeight:'600',
    paddingBottom:10
  },
  interestList:{
    width:60, 
    backgroundColor:'#138172',
    padding:5,
    borderRadius:5,
    marginRight:10,
    alignItems:'center'
  },
  box1: {
    height:'40%',
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
    height: 0.5,
    width: '100%'
},
});
function mapStateToProps(state){
  return {
    page:state.Page.page,
    img:state.Profile.img,
    userid:state.Profile.userid
  }
}
 
export default connect (mapStateToProps)(Profile);
