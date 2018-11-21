import React from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, Button, SearchBar, ListItem, AsyncStorage} from 'react-native';
import {db, auth} from '../constants/FConfig';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import Post from './Post';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux';
import {ChangePage, ChangeTab} from '../redux/Actions';

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
        <View style={{position:'absolute', top:0, left:0, width:'100%', alignItems:'center', height:107}}>
          <View style={[styles.searchBar,{backgroundColor:'#FFF', flexDirection:'row'}]}>
            <Icon
          name="search"
          size={18}
          style={{ marginHorizontal: 5 }}
        />
          <TextInput
            
            autoCapitalize = 'none'
            placeholder="Search"
            autoCorrect={false}
            onChangeText={(text) => this.handleSearch(text)}
          />
          </View>
          
          <View style={{width:'100%'}}>
             <Text style={{opacity:0.7, marginLeft:10, fontSize:12, marginBottom:5}}>Filtered by</Text>
          </View>
         
          <ScrollView 
            horizontal={true} 
            overScrollMode='auto'
            showsHorizontalScrollIndicator='false'>
            
          <View 
            style={{flexDirection:'row', marginLeft:10, justfyContent:'space-btween' }}>
           
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
        <View style={{width:"95%",marginTop:105, marginBottom:50, paddingBottom:40}}>
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
    page:state.Page.page,
    tab:state.Page.tab
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
    marginTop:10,
    marginBottom:10,
    paddingTop:10 ,
    paddingBottom:10 ,
    paddingLeft:5 ,
    paddingRight:5 ,
    backgroundColor:'#fff',
    borderRadius:10,
  },
  catrgory:{
    backgroundColor:'rgba(19,129,114,0.7)', 
    paddingLeft:10, 
    paddingRight:10, 
    paddingTop:6, 
    paddingBottom:0, 
    marginRight:13,
    borderRadius:5, 
    shadowOffset:{ width: 0,  height: 3, },
    shadowRadius: 5,
    shadowColor: '#ccc', 
    shadowOpacity: 1,
  },
  hairline: {
    position:'absolute',
    left:0,
    top:116,
    backgroundColor: '#A2A2A2',
    height: 0.8,
    opacity:0.5,
    width: '100%'
},
});