import React from 'react';

import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import {auth, db} from '../constants/FConfig';

import {connect} from 'react-redux';
import {ChangeTab, ChangePage} from '../redux/Actions';

class CreatePost extends React.Component {
  
  state={
    title: "",
    content: "",
    tags: ""
  }

  createNewPost =()=>{
    var newPostKey = db.ref().child('posts').push().key;
    var current = auth.currentUser.uid;
    var date = new Date().toUTCString();
    var timestamp = new Date().getTime();
    
    this.writeNewPost(current, newPostKey, date, this.state.title, this.state.content, timestamp);
  }
  
  writeNewPost=(uid, postid, date, title, content, timestamp)=>{
    db.ref('posts/' + postid).set({
        userID: uid,
        postID: postid,
        date: date,
        title: title,
        content: content,
        timestamp: timestamp
    })
  }
  
  navigateToCamera=()=>{
    this.props.dispatch(ChangePage(5));
  }; 
  
  render() {
    return (
      <ScrollView style={{backgroundColor:'#fff'}}>
      <View style={styles.container}>
        <View style={styles.pageTitle}>
            <Text style={styles.titleFont}>Create an Idea</Text>
        </View>
        <View style={styles.boxes}>
            <View style={styles.box}><Text>gallery</Text></View>
            <View style={styles.verticalHairline}/>
            <View style={styles.box}>
              <TouchableOpacity onPress={this.navigateToCamera}>
                <Image 
                  source={require('../assets/images/camera.png')}
                  style={styles.imgIcon}
                  />
              </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.items, styles.title]}>
          <TextInput
              placeholder='Title'
              onChangeText={(text)=> this.setState({title: text})}
          />
        </View>
        <View style={styles.hairline} />
        <View style={[styles.items, styles.content]}>
           <TextInput
              placeholder='Content'
              multiline={true}
              onChangeText={(text)=> this.setState({content: text})}
            />  
        </View> 
        <View style={styles.hairline} />
        
        <View style={[styles.items, styles.hashtag]}>
            <TextInput
              placeholder='select the categoty'
              onChangeText={(text)=> this.setState({tags: text})}

            />
        </View>
        <View style={styles.butBox}> 
            <TouchableOpacity onPress={this.createNewPost}> 
                    <View style={[styles.signBut]}>
                        <Text style={styles.buttonText}>POST</Text>
                    </View>
            </TouchableOpacity>
       </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.6,
    width: '100%'
  },
  verticalHairline:{
    backgroundColor: '#A2A2A2',
    height: 150,
    width: 0.5
  },
  pageTitle: {
    paddingTop:65,
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
  boxes: {
    flexDirection:'row',
    width:'100%',
    marginTop:0,
  },
  box: {
    width:'50%',
    paddingLeft:'15%',
    paddingRight:'15%',
    height:150,
    backgroundColor:"#F2F2F2",
    alignContent:'center',
    justifyContent:'center'
  },
  items: {
    width:'100%',
    padding:10,
  },
  title: {
    height:'10%'  
  },
  content: {
    height:'30%' 
  },
  hashtag: {
    height:'10%',
    marginBottom:'5%'
  },
  buttonText:{
    fontSize:17,
    color:"#fff",
    fontWeight:"300",
  },
  signBut:{
    alignItems:'center',
    margin:5,
    padding:15,
    borderRadius:10,
    backgroundColor:"#138172",
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: "#ccc",
    shadowOpacity: 1,
  },
  butBox: {
    flexDirection:"column",
    width:"80%"  
  },
  imgIcon:{
    width:'100%',
    resizeMode:'contain'
  }
});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect (mapStateToProps)(CreatePost);

