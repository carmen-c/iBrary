import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground, ScrollView,TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';

import {connect} from 'react-redux';
import {ChangeTab} from '../redux/Actions';
import {db} from '../constants/FConfig';

class Comment extends React.Component {
  
  handleSelected=()=>{
//    console.log("clicked: ", this.props.postid);
  }
  
  addToPost=()=>{
    console.log("add to post");
    db.ref('posts/' + this.props.postid).update({
        pickedComments: this.props.commentid
    }).then(()=>{
//      alert("stuff");
//      this.props.refresh();
    });
  }

  render() {
    
    var swipeoutBtns = [
      {
       text:'Pick', 
       backgroundColor:'#138172', 
       onPress:this.addToPost
      }
    ]
    
    return (
      <Swipeout 
        left={swipeoutBtns}
        autoClose={true}
        backgroundColor="#fff"
        
        >
        <View style={styles.container}>
          <View style={styles.hairline}/>
          <TouchableOpacity style={styles.list} refs={this.props.commentid} onPress={this.handleSelected}>
            <View>
              <View style={{width:'90%',flexDirection:'row'}}>
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
    width:'90%',
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
    tab: state.Page.tab
  }
}
export default connect (mapStateToProps)(Comment);