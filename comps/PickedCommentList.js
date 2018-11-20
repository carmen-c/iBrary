import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {db} from '../constants/FConfig';

import {connect} from 'react-redux';
import PickedComment from './PickedComment';

class PickedCommentList extends React.Component {
  
  state={
    error:"",
    arrData: [],
    loading: false,
  }

  componentWillMount=()=>{
    this.readPickedComments();
  }
  
  readPickedComments=()=>{
    //filter props array
    var items = this.props.comments.filter((comment)=>{
      if(status == true){
        return comment
      }
    })
    this.setState({arrData:items});
    console.log("PICKED COMMENTS :",this.props.arrData)
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
              extraData={this.props.comments}
              data={this.state.arrData}
              keyExtractor={item => item.key}
              renderItem={this.renderList}
            />
        </View>
      </View>
    
    );
  }
}
function mapStateToProps(state){
  return {
    comments: state.AllComments.comments
  }
}
export default connect (mapStateToProps)(PickedCommentList);

const styles = StyleSheet.create({
  container: {
    width:"100%", 
  }
});
