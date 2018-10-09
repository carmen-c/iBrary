import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={styles.container}>
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
    flex: 1,
    backgroundColor: '#e6e6e6',
    flexDirection: 'column'
 
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
    height:'20%',
    backgroundColor:'pink',
    marginTop:30,
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
