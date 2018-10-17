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
        <View style={styles.tabBar}>
          <Text>Tab bar here</Text>
          
          <TouchableOpacity onPress={this.handleButton.bind(this, 2)}> 
          <View>
              <Image 
                source={require('../assets/images/robot-dev.png')}
                />
              <Text>post</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={this.handleButton.bind(this, 1)}> 
          <View>
              <Image 
                source={require('../assets/images/robot-dev.png')}
                />
              <Text>home</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={this.handleButton.bind(this, 3)}> 
          <View>
              <Image 
                source={require('../assets/images/robot-dev.png')}
                />
              <Text>profile</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

function mapStateToProps(state){
  return {
    tab:state.Page.tab
  }
}

export default connect (mapStateToProps)(TabBar);