import React from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, Button, SearchBar, ListItem} from 'react-native';
import {db, auth} from '../constants/FConfig';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import Post from './Post';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';

class Home extends React.Component {
  
  state={
    error:"",
    arrData: [],
    loading: false,
    search: "",
    refreshing: false
  }
  
  componentWillMount=()=>{
    this.readPosts();
  }
  
  handleSearch=(keyword)=>{
    if(keyword.length == 0) {
      this.readPosts();
    } else { 
      var newResult = this.state.arrData.filter((post)=>{
        var matchThis = new RegExp(keyword, 'g');
        var arr = post.title.match(matchThis);
      return arr;
      })
      this.setState({
      arrData:newResult
      })
    } 
  }
  
  readPosts=()=>{
    this.setState({refreshing: true});
    db.ref('posts/')
      .limitToLast(100)
      .once('value')
      .then(snapshot => {
      var items = [];
      var profileimg = "";
      
      snapshot.forEach(child =>{
        
        db.ref('users/'+child.val().userID+"/img").once('value').then((snapshot)=>{
          var profileimg = snapshot.val();
          items.push({
            key: child.val().postID,
            title: child.val().title,
            content: child.val().content,
            date: child.val().date,
            username: child.val().username,
            img:child.val().img,
            pickedComments:child.val().pickedComments,
            userimg: profileimg,
            timestamp:child.val().timestamp
          });
        }).then(()=>{
          var newthingy = items.sort((x,y)=>{
            return x.timestamp - y.timestamp;
          })
          newthingy = newthingy.reverse();
          this.setState({arrData: newthingy, refreshing: false});
        })
      });
    }).catch(error => {
      this.setState({error: error.message})
    });
  }
  
  renderList=({item}) =>  {
    return(
      <Post 
       title={item.title} 
       content={item.content} 
       postid={item.key}
       username={item.username}
       img={item.img}
       pickedComments={item.pickedComments}
       userimg = {item.userimg}
       />
    )
  }
    
  render() {
    
    return (

      <View style={styles.container}>
        
        <TextInput
            style={styles.searchBar}
            placeholder="Search"
            autoCorrect={false}
            onChangeText={(text) => this.handleSearch(text)}
        />
      
        <Text>{this.state.error}</Text>
        <View style={{width:"95%",marginTop:50, marginBottom:50, paddingBottom:40}}>
            <FlatList
              extraData={this.state.arrData}
              data={this.state.arrData}
              keyExtractor={item => item.key}
              renderItem={this.renderList}
              onRefresh={this.readPosts}
              refreshing={this.state.refreshing}
              ListEmpty=<Text>Oops empty list</Text>
            />
        </View>
      </View>
    
    );
  }
}

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}
export default connect (mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    width:"100%",
    marginTop:15,
    backgroundColor:'#e6e6e6',   
  },
  searchBar: {
    position:'absolute',
    top:8,
    width:'90%',
    marginTop:7,
    marginBottom:20,
    padding:10 ,
    backgroundColor:'#fff',
    borderRadius:10,
  }
});