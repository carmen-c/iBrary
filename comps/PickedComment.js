import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground, ScrollView,TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';

import {connect} from 'react-redux';
import {ChangeTab, UpdatePicked} from '../redux/Actions';
import {db} from '../constants/FConfig';

class PickedComment extends React.Component {
  
  deleteFromPost=()=>{
    db.ref('posts/' + this.props.postid).update({
      //pop to remove from array??
        pickedComments: ""
    }).then(()=>{
//      alert("stuff");
      this.props.refresh();
    });
    this.props.dispatch(UpdatePicked(""));
    console.log("UPDATED: ", this.props.picked);
  }

  render() {
    
    var swipeoutBtns = [
      {
       text:'Delete', 
       backgroundColor:'#138172', 
       onPress:this.deleteFromPost
      }
    ]
    
    return (
      <Swipeout 
        left={swipeoutBtns}
        autoClose={true}
        backgroundColor="#fff"
        >
        <View style={styles.container}>
          <TouchableOpacity style={styles.list} refs={this.props.commentid}>
            <View>
              <View style={{flexDirection:'row',  backgroundColor:'#56ada1', padding:6, borderRadius:5}}>
                <Text style={styles.username}>{this.props.username}</Text>
                <Text>{this.props.comment}</Text>
              </View>
               
            </View>
          </TouchableOpacity>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    alignItems:'center',
  },
  list:{
    width:'100%',
    padding:7,
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.6,
    width: '90%'
  },
  username:{
    fontWeight:'bold',
    marginRight:10,
  }

});


function mapStateToProps(state){
  return {
    page:state.Page.page,
    tab: state.Page.tab,
    picked: state.SelectPost.picked
  }
}
export default connect (mapStateToProps)(PickedComment);