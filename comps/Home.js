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
    search: ""
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
    db.ref('posts/')
      .limitToLast(100)
      .once('value')
      .then(snapshot => {
      var items = [];
      
      snapshot.forEach(child =>{
        items.unshift({
          key: child.val().postID,
          title: child.val().title,
          content: child.val().content,
          date: child.val().date
        })
      });
      this.setState({arrData: items})
    }).catch(error => {
      this.setState({error: error.message})
    });
  }
  
  logout = async ()=>{
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    auth.signOut().then(()=> {
//      console.log('Signed Out');
      this.props.dispatch(ChangePage(1));
    }).catch(error => {
      console.log(error.message);
    });
  }
  
  renderList=({item}) =>  {
    return(
      <Post 
       title={item.title} 
       content={item.content} 
       postid={item.key}
       />
    )
  }
    
  render() {
    //this.readPosts();
    
    return (

      <View style={styles.container}>
        
        <TextInput
            style={styles.searchBar}
            placeholder="Search"
            autoCorrect={false}
            onChangeText={(text) => this.handleSearch(text)}
        />
       
        <Button
            title="temp Logout"
            onPress={this.logout}
            />
        <Text>{this.state.error}</Text>
        <View style={{width:"95%",marginTop:35, paddingBottom:150}}>
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
    marginTop:30,
    backgroundColor:'#e6e6e6',   
  },
  searchBar: {
    position:'absolute',
    top:8,
    width:'90%',
    marginTop:20,
    padding:15,
    backgroundColor:'#fff',
  }
});
