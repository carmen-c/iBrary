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
          comment: child.val().comment
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
       />
    )
  }
    
  render() {
//    this.readComments();
    
    return (

      <View style={styles.container}>
        <Text>{this.state.error}</Text>
        <View style={{width:'100%',height:200,marginTop:5}}>
            <FlatList
              extraData={this.state.arrData}
              data={this.state.arrData}
              keyExtractor={item => item.key}
              renderItem={this.renderList}
            />
          <Text>comment list here...</Text>
        </View>
      </View>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    marginTop:30,   
  }
});
