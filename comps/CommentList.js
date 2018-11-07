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
      .equalTo(this.props.postid)
      .on('value', this.createCommentList);
  }
  
  createCommentList=(snapshot)=>{
      var items = [];
      
      snapshot.forEach(child =>{
        items.unshift({
          key: child.val().commentID,
          postid: child.val().postID,
          comment: child.val().comment
        })
      });
      this.setState({arrData: items});
  }

  renderList=({item}) =>  {
    return(
      <Comment
       commentid={item.key}
       postid={item.postid}
       comment={item.comment}
       />
    )
  }
    
  render() {
    //this.readPosts();
    
    return (

      <View style={styles.container}>
        <Text>{this.state.error}</Text>
        <View style={{marginTop:35, paddingBottom:150}}>
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
    alignItems:'center',
    width:"100%",
    marginTop:30,
    backgroundColor:'#e6e6e6',   
  }
});
