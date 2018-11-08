import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Login from '../comps/Login';
import Welcome from '../comps/Welcome';
import SignUp from '../comps/SignUp';
import MyCamera from '../comps/Camera'
import Category from '../comps/Category';
import ProfileSetting from '../comps/ProfileSetting';
import Gallery from '../comps/Gallery';
import GalleryForProfile from '../comps/GalleryForProfile';
import TabBar from './TabBar';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';

class Main extends React.Component {
  
  handleButton=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  
  render() {
    var curpage = <Login/>;
    
    //we are changing state to use the global state
    switch(this.props.page){

      case 1:
        curpage = <Login />
        break;
      case 2:
        curpage = <Welcome />
        break;
      case 3:
        curpage = <SignUp />
        break;
      case 4:
        curpage = <TabBar />
        break;
      case 5:
        curpage = <MyCamera />
        break;
      case 6:
        curpage = <Category />
        break;
      case 7:
        curpage = <ProfileSetting/>
        break;
      case 8:
        curpage = <Gallery/>
        break;
      case 9:
        curpage =<GalleryForProfile/>
        break;
      default:
        curpage = <Login />
        break;
    }
    
    return (
      <View style={styles.container}>
        {curpage}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
  },
});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect (mapStateToProps)(Main);