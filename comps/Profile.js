import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground, TouchableOpacity } from 'react-native';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  navigatePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  
  render() {
    return (
      <View style={styles.container}>
         <View style={styles.pageTitle}>
            <Text style={styles.titleFont}>Profile</Text>
        </View>
        <TouchableOpacity onPress={this.navigatePage.bind(this,7)}>
          <Text>Setting</Text>
        </TouchableOpacity>
        <View style={styles.section}>
            <View style={styles.box1}>
              <Image 
                source={require('../assets/images/profile.jpg')}
                style={styles.profile}            
              />
            </View>
            <View style={styles.box1}>
                <Text>User's Nick Name</Text> 
                <Text>Bio</Text>
            </View>
        </View>
        <View style={styles.hairline} />
        <View style={styles.section}>
           <Text>Interest</Text>
        </View>
        <View style={styles.hairline} />
        <View style={styles.section}>
           <Text>Social Media</Text>
        </View>
        <View style={styles.hairline} />
        <View style={styles.section}>
           <Text>Ideas</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    backgroundColor: '#e6e6e6',
    flexDirection: 'column'
 
  },
  pageTitle: {
    paddingTop:65,
    paddingBottom:30,
    width:'100%',
    backgroundColor:'#e6e6e6',
//    alignContent:'center',
    alignItems:'center',
  },
  titleFont:{
    fontSize:25,
    fontWeight: 'bold',
    color:'#138172'
  },
  section: {
    width:'100%',
    paddingLeft:15,
    paddingTop:5,
    paddingBottom:5,
//    flex:1,
    flexDirection:'row'
  },
  box1: {
    height:'40%',
//    backgroundColor:'pink',
    marginTop:5,
    paddingBottom:'5%'
  },
  profile: {
    width:80,
    height:80,
    resizeMode:'cover',
    borderRadius:40,
    marginRight:20
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.3,
    width: '100%'
},
});
function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}
 
export default connect (mapStateToProps)(Profile);
