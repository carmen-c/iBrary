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
  }
  
  handleSearch=()=>{
    
  }
  
  readPosts=()=>{
    db.ref('posts/').orderByChild('timestamp').once('value').then(snapshot => {
      var items = [];
      
      snapshot.forEach(child =>{
//        console.log(childSnapshot.val())
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
  
  render() {
    this.readPosts();
    
    return (

      <View style={styles.container}>
        
        <TextInput
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={this.handleSearch}
        />
       
        <Button
            title="temp Logout"
            onPress={this.logout}
            />
        <Text>{this.state.error}</Text>
        <View style={{marginTop:35, paddingBottom:150}}>
            <FlatList
              data={this.state.arrData}
              keyExtractor={item => item.key}
              renderItem={({item}) => (<Post 
                                         title={item.title} 
                                         content={item.content} 
                                         postid={item.postID}
                                         />)}
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
    top:10,
    width:'85%',
    marginTop:20,
    padding:15,
    backgroundColor:'#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
