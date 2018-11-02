import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import Home from '../comps/Home';
import CreatePost from '../comps/CreatePost';
import Profile from '../comps/Profile';

import {connect} from 'react-redux';
import {ChangePage, ChangeTab} from '../redux/Actions';

class TabBar extends React.Component {
  
  handleButton=(tab)=>{
    this.props.dispatch(ChangeTab(tab));
  }
  
  render() {
    var curtab = <Home/>;
    
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
      default:
        curtab = <Home />
        break;
    }
    
    return (
    
        <View style={styles.container}>
        {curtab}
        
        <View style={styles.hairline} />
        
        <View style={styles.nav}>
          <TouchableOpacity onPress={this.handleButton.bind(this, 2)}>
              <Image
                   style={styles.navIcon}
                  source={require('../assets/images/createButton.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleButton.bind(this, 1)}>
              <Image
                   style={styles.navIcon}
                  source={require('../assets/images/homeButton.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleButton.bind(this, 3)}>
              <Image
                   style={styles.navIcon}
                  source={require('../assets/images/profileButton.png')}/>
          </TouchableOpacity>
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
    justifyContent: 'space-around',
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.3,
    width: '100%',
    margin:0,
    padding:0,
    position:'absolute',
    bottom:65,
  },
  nav: {
    height:65,
    backgroundColor: '#f1f1f1',
    flexDirection:'row',
    paddingTop:20,
    position:'absolute',
    bottom:0,
    
  },
  navIcon: {
    width:27,
    height:27,
    resizeMode:'contain',
    marginLeft:'30%'
  }
});

function mapStateToProps(state){
  return {
    tab:state.Page.tab
  }
}

export default connect (mapStateToProps)(TabBar);