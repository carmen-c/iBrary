import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import Home from '../comps/Home';
import CreatePost from '../comps/CreatePost';
import Profile from '../comps/Profile';
import PostDetail from '../comps/PostDetail';

import {connect} from 'react-redux';
import {ChangePage, ChangeTab} from '../redux/Actions';

class TabBar extends React.Component {
  state={
    homeImg:require('../assets/images/homeButtonClicked.png'),
    postImg:require('../assets/images/createButton.png'),
    profileImg:require('../assets/images/profileButton.png')
  }
  handleButton=async(tab)=>{
    
    //change icon to colored one
    if(tab === 1){
       this.setState({
         homeImg:require('../assets/images/homeButtonClicked.png'),
         postImg:require('../assets/images/createButton.png'),
         profileImg:require('../assets/images/profileButton.png')
        })
    }
    else if(tab === 2){
       this.setState({
         homeImg:require('../assets/images/homeButton.png'),
         postImg:require('../assets/images/createButtonClicked.png'),
         profileImg:require('../assets/images/profileButton.png')
        })
    }
    else{
       this.setState({
         homeImg:require('../assets/images/homeButton.png'),
         postImg:require('../assets/images/createButton.png'),
         profileImg:require('../assets/images/profileButtonClicked.png')
        })
    }
    this.props.dispatch(ChangeTab(tab));
  }
  
  render() {
    var curtab = null;
    
    //we are changing state to use the global state
    switch(this.props.tab){

      case 1:
        curtab = <Home />
        break;
      case 2:
        curtab = <CreatePost />
        break;
      case 3:
        curtab = <Profile />
        break;
      case 4:
        curtab = <PostDetail/>
        break;
      default:
        curtab = <Home />
        break;
    }
    
    return (
    
        <View style={styles.container}>
        {curtab}
        
        <View style={styles.hairline} />
        
        <View style={styles.nav}>
          <View style={styles.flex}>
            <TouchableOpacity onPress={this.handleButton.bind(this, 2)}>
              <Image
                  style={styles.navIcon}
                  source={this.state.postImg}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleButton.bind(this, 1)}>
              <Image
                  style={styles.navIcon}
                  source={this.state.homeImg}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleButton.bind(this, 3)}>
              <Image
                  style={styles.navIcon}
                  source={this.state.profileImg}/>
          </TouchableOpacity>
          </View>
          
        </View>
        
      </View>
        

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:65,
    paddingBottom:0,
    flex: 1,
    alignItems: 'center',

  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.3,
    width: '100%',
    margin:0,
    padding:0,
    position:'absolute',
    bottom:65,
    ...ifIphoneX({
            bottom: 75
        }, {
            bottom: 65
        })
  },
  flex:{
    width:'88%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  nav: {
    width:'100%',
    backgroundColor: '#f1f1f1',
    alignItems:'center',
    paddingTop:20,
    position:'absolute',
    bottom:0,
    ...ifIphoneX({
            height: 75
        }, {
            height: 65
        })
    
  },
  navIcon: {
    width:27,
    height:27,
    resizeMode:'contain',
  }
});

function mapStateToProps(state){
  return {
    tab:state.Page.tab
  }
}

export default connect (mapStateToProps)(TabBar);