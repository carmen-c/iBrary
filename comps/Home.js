import React from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, Button, SearchBar, ListItem, AsyncStorage} from 'react-native';
import {db, auth} from '../constants/FConfig';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import Post from './Post';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';

const data = []
listEmptyComponent = () => {
    <View>
        <Text>Empty List</Text>
    </View>
}

class Home extends React.Component {
  
  state={
    error:"",
    arrData: [],
    filterData:[],
    loading: false,
    search: "",
    refreshing: false
  }
  
  componentWillMount=()=>{
    this.readPosts();
    this.storage();
  }
  
  storage=async()=>{
    await AsyncStorage.setItem('firsttime', "YES");
  }
  
  handleSearch=(keyword)=>{
    console.log(keyword)
    if(keyword.length == 0) {
      this.readPosts();
    } else { 
      var newResult = this.state.arrData.filter((post)=>{
        var matchThis = new RegExp(keyword, 'g');
        var arr = post.title.match(matchThis);
      return arr;
      })
      this.setState({
        filterData:newResult
      })
    } 
  }
  
  readInterestPosts=(interest)=>{
    this.setState({refreshing: true});
    db.ref('posts/')
      .orderByChild('category')
      .equalTo(interest)
      .on('value', this.managePosts);
  }
  
  readPosts=()=>{
    this.setState({refreshing: true});
    db.ref('posts/')
      .limitToLast(100)
      .once('value', this.managePosts);
  }
  
  managePosts=(snapshot)=>{
    if(snapshot.exists()){
      var items = [];

      snapshot.forEach(child =>{
        db.ref('users/'+child.val().userID).once('value').then((snapshot)=>{
          var profileimg = snapshot.val().img;
          var profilename = snapshot.val().name;
          items.push({
            key: child.val().postID,
            title: child.val().title,
            content: child.val().content,
            date: child.val().date,
            username: profilename,
            img:child.val().img,
            pickedComments:child.val().pickedComments,
            userimg: profileimg,
            timestamp:child.val().timestamp,
            author:child.val().userID,
            category:child.val().category,
            progress:child.val().progress
          });
          items = items.sort((x,y)=>{
          return x.timestamp - y.timestamp;
          })
          items = items.reverse();
          this.setState({arrData: items, filterData:items, refreshing: false}); 
//          console.log(items)
          });
      })
    } else {
      var items = [];
      this.setState({filterData: items, refreshing: false}); 
    }
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
       userimg={item.userimg}
       author={item.author}
       category={item.category}
       progress={item.progress}
       />
    )
  }
    
  render() {
    
    return (

      <View style={styles.container}>
        <View style={{position:'absolute', top:0, left:0, width:'100%', alignItems:'center', height:85}}>
          <TextInput
            style={styles.searchBar}
            autoCapitalize = 'none'
            placeholder="Search"
            autoCorrect={false}
            onChangeText={(text) => this.handleSearch(text)}
          />
          <ScrollView 
            horizontal={true} 
            overScrollMode='auto'
            showsHorizontalScrollIndicator='false'>  
          <View 
            style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', marginLeft:10, }}>
           
              <TouchableOpacity style={styles.catrgory} onPress={this.readPosts}>
                <Text style={{color:'#fff'}}>Latest</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catrgory} onPress={this.readInterestPosts.bind(this, 'App')}>
                <Text>App</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catrgory} onPress={this.readInterestPosts.bind(this, 'Graphic Design')}>
                <Text>Graphic Design</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catrgory} onPress={this.readInterestPosts.bind(this, 'Video')}>
                <Text>Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catrgory} onPress={this.readInterestPosts.bind(this, 'Product')}>
                <Text>Product</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.catrgory} onPress={this.readInterestPosts.bind(this, 'Marketing')}>
                <Text>Marketing</Text>
              </TouchableOpacity>    
          </View>
          </ScrollView>
        </View>
              
        <Text>{this.state.error}</Text>
        <View style={{width:"95%",marginTop:80, marginBottom:50, paddingBottom:40}}>
            <FlatList
              extraData={this.state}
              data={this.state.filterData}
              keyExtractor={item => item.key}
              renderItem={this.renderList}
              onRefresh={this.readPosts}
              refreshing={this.state.refreshing}
              ListEmptyComponent={this.listEmptyComponent}
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
//    position:'absolute',
//    top:8,
    width:'90%',
    marginTop:7,
    marginBottom:10,
    padding:10 ,
    backgroundColor:'#fff',
    borderRadius:10,
  },
  catrgory:{
    backgroundColor:'rgba(19,129,114,0.7)', 
    padding:5, 
    marginRight:20,
    borderRadius:5, 
    shadowOffset:{ width: 0,  height: 3, },
    shadowRadius: 5,
    shadowColor: '#ccc', 
    shadowOpacity: 1,}
});