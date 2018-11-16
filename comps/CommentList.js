import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {db} from '../constants/FConfig';

import Comment from './Comment';

export default class CommentList extends React.Component {
  
  state={
    error:"",
    arrData: [],
    loading: false,
  }
  
  componentWillMount=()=>{
    this.readComments();
  }
  
  readComments=()=>{
    db.ref('comments/')
      .orderByChild('postID')
      .equalTo(this.props.postid)
      .on('value', this.createCommentList);
  }
  
  createCommentList=(snapshot)=>{
      var items = [];
      
      snapshot.forEach(child =>{
        items.unshift({
          key: child.val().commentID,
          postid: child.val().postID,
          comment: child.val().comment,
          username: child.val().username
        })
      });
    console.log(items)
      this.setState({arrData: items});
     console.log(this.state.arrData);
  }

  renderList=({item}) =>  {
    return(
      <Comment
       commentid={item.key}
       postid={item.postid}
       comment={item.comment}
       username={item.username}
       />
    )
  }
    
  render() {
//    this.readComments();
    
    return (

      <View style={styles.container}>
        <Text style={{height:8}}>{this.state.error}</Text>
        <View style={{width:'100%'}}>
            <FlatList
              extraData={this.state.arrData}
              data={this.state.arrData}
              keyExtractor={item => item.key}
              renderItem={this.renderList}
            />
        </View>
      </View>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%", 
  }
});
