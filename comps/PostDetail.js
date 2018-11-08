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
      <View style={styles.container}>
        <View style={{height:60}}>
          <TouchableOpacity 
           onPress={this.navigateToHome}> 
           <Image 
              style={styles.backBut}
              source={require('../assets/images/backButton.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contents}>
          <View style={styles.posting}>
            <View style={{width:'90%', marginTop:10, height:50, backgroundColor:'#fcfcfc'}}>
              <View style={{flexDirection:'row', backgroundColor:'#fcfcfc'}}>
                <Image style={{ width:40, height:40, marginRight:10}} source={require('../assets/images/profileDefault.png')} />
                <Text style={{fontWeight:'bold', fontSize:15, color:'#7a7979', marginTop:5}}>{this.props.username}</Text>
              </View>
            </View>
              
           <View style={{width:'80%', marginBottom:20}} >
              <View style={{alignItems:'center'}} refs={this.props.postid}>
               <Text style={{fontSize: 20, margin:15, fontWeight: 'bold',}}>
                 {this.props.title}
                </Text>
              </View>
              <Text style={{fontSize: 16}}>
                {this.props.content}
              </Text>
           </View>
            <View style={styles.hairline}/>
          </View>
        
          <View style={{width:'100%', height:'100%',alignItems:'center'}}>
            <CommentList postid={this.props.postid}/>
            <View style={styles.hairline}/>
            <CreateComment postid={this.props.postid}/>
            <View style={styles.hairline}/>
          </View>
          
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
    username:state.SelectPost.username,
  }
}
export default connect (mapStateToProps)(PostDetail);


const styles = StyleSheet.create({
  container: {
    marginTop: 15, 
    width:'100%',
    height:'100%',
  },
  contents:{
    width:'100%',
    height:'100%', 
    backgroundColor:'#fff'
  },
  posting:{
    width:'100%', 
    margin:0,
    alignItems:'center'
  },
  comments: {
    width: "100%",
    flex: 1
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.6,
    width: '90%'
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