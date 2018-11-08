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
        <View style={{width:'70%',padding:10, marginLeft:'5%'}}>
           <TextInput
              placeholder='Make an comment'
              multiline={true}
              onChangeText={(text)=> this.setState({comment: text})}
            />  
        </View> 
        
        <View style={{width:'20%', marginRight:15}}>
            <TouchableOpacity onPress={this.createNewComment}> 
                    <View style={[styles.signBut]}>
                        <Text style={styles.buttonText}>ADD</Text>
                    </View>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,   
    flexDirection:'row',

    width:'100%',
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.6,
    width: '90%'
  },
  buttonText:{
    fontSize:15,
    color:"#fff",
    fontWeight:"300",
  },
  signBut:{
    alignItems:'center',
    margin:5,
    padding:5,
    borderRadius:5,
    backgroundColor:"#138172",
  },
  butBox: {
    width:"100%"  
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

