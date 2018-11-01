import React from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native';
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
    this.writeNewPost(current, newPostKey, date, this.state.title, this.state.content);
  }
  
  writeNewPost=(uid, postid, date, title, content)=>{
    db.ref('posts/' + postid).set({
        userID: uid,
        postID: postid,
        date: date,
        title: title,
        content: content
    })
  }
  
  navigateToCamera=()=>{
    this.props.dispatch(ChangePage(5));
  } 
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pageTitle}>
            <Text style={styles.titleFont}>Create an Idea</Text>
        </View>
        <View style={styles.boxes}>
            <View style={styles.box}><Text>gallery</Text></View>
            <View style={styles.box}><Button title= "camera" onPress = {this.navigateToCamera}/></View>
    
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
              onChangeText={(text)=> this.setState({content: text})}
            />  
        </View> 
        <View style={styles.hairline} />
        
        <View style={[styles.items, styles.hashtag]}>
            <TextInput
              placeholder='# Add Hashtags'
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.3,
    width: '100%'
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
    height:'25%' 
  },
  hashtag: {
    height:'10%'
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
});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect (mapStateToProps)(CreatePost);

