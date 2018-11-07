import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground, ScrollView,TouchableOpacity } from 'react-native';

import {connect} from 'react-redux';
import {ChangeTab} from '../redux/Actions';

import {auth} from '../constants/FConfig';
import CreateComment from './CreateComment';
import CommentList from './CommentList';

class PostDetail extends React.Component {
  
  check=()=>{
    if (auth.currentUser.uid == this.props.userid){
      //enable editing stuff
    } else {
      
    }
  }
  
  navigateToHome=()=>{
    this.props.dispatch(ChangeTab(1));
  }

  //back button, post info, comments, createcomment
  render() {
    
    this.check();
    
    return (
      <View style={{marginTop: 50, height: "100%"}}>
        <View style={{flex: 0.15}}>
          <TouchableOpacity 
           onPress={this.navigateToHome}> 
           <Image 
              style={styles.backBut}
              source={require('../assets/images/backButton.png')}
            />
          </TouchableOpacity>
        </View>
        
         <View style={{flex: 0.45}}>
            <View refs={this.props.postid}>
            <Text style={{fontSize: 20, marginBottom:10}}>{this.props.title}</Text>
            </View>
            <Text>{this.props.content}</Text>
          </View>
        
          <View style={{flex:0.40}}>
            <CommentList postid={this.props.postid}/>
            <CreateComment postid={this.props.postid}/>
          </View>
      </View>
        
    );
  }
}

function mapStateToProps(state){
  return {
    page:state.Page.page,
    tab: state.Page.tab,
    postid:state.SelectPost.postid,
    userid:state.SelectPost.userid,
    title:state.SelectPost.title,
    content:state.SelectPost.content,
  }
}
export default connect (mapStateToProps)(PostDetail);


const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    flex: 1,
    alignItems:'center',
  },
  comments: {
    width: "100%",
    flex: 1
  },
  list:{
    width:'95%',
    backgroundColor:'#fff',
    marginBottom:20,
    borderRadius:10,
    padding:15
  },
  backBut: {
    width:30,
    height:30,
    position:'absolute',
    left:5,
    top:15,
    resizeMode:'contain',
    zIndex:50
  },

});