import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {db} from '../constants/FConfig';

import PickedComment from './PickedComment';

export default class CommentList extends React.Component {
  
  state={
    error:"",
    arrData: [],
    loading: false,
  }
  
  componentWillMount=()=>{
//    console.log("PICKED: ",this.props.pickedComments);
      this.readPickedComments();
  }
  
  readPickedComments=()=>{
//    console.log(this.props.picked);
    if(this.props.pickedComments != null) {
      db.ref('comments/')
        .orderByChild('commentID')
        .equalTo(this.props.pickedComments)
        .on('value', this.createCommentList);
    }
  }
  
  createCommentList=(snapshot)=>{
      var items = [];
      
      snapshot.forEach(child =>{
        items.unshift({
          key: child.val().commentID,
          postid: child.val().postID,
          comment: child.val().comment,
          username: child.val().username,
        })
      });
//    console.log(items)
      this.setState({arrData: items});
//     console.log(this.state.arrData);
  }

  renderList=({item}) =>  {
    return(
      <PickedComment
       commentid={item.key}
       postid={item.postid}
       comment={item.comment}
       username={item.username}
       refresh={this.readPickedComments}
       />
    )
  }
    
  render() {
//    this.readComments();
    
    return (

      <View style={styles.container}>
        <Text>{this.state.error}</Text>
        
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
