import React from 'react';

import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import {auth, db} from '../constants/FConfig';

import {connect} from 'react-redux';
import {ChangeTab, ChangePage} from '../redux/Actions';

class CreateComment extends React.Component {
  
  state={
    comment: ""
  }

  createNewComment =()=>{
    var newCommentKey = db.ref().child('comments').push().key;
    var current = auth.currentUser.uid;
    var date = new Date().toUTCString();
    var timestamp = new Date().getTime();
    var post = this.props.postid;
    
    this.writeNewComment(current, newCommentKey, date, this.state.comment, timestamp, post);
  }
  
  writeNewComment=(uid, commentid, date, comment, timestamp, post)=>{
    db.ref('comments/' + commentid).set({
        userID: uid,
        commentID: commentid,
        date: date,
        comment: comment,
        timestamp: timestamp,
        postID: post
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.items, styles.content]}>
           <TextInput
              placeholder='Comment'
              multiline={true}
              onChangeText={(text)=> this.setState({comment: text})}
            />  
        </View> 
        <View style={styles.butBox}> 
            <TouchableOpacity onPress={this.createNewComment}> 
                    <View style={[styles.signBut]}>
                        <Text style={styles.buttonText}>COMMENT</Text>
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
    page:state.Page.page,
  }
}

export default connect (mapStateToProps)(CreateComment);

