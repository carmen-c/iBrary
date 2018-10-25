import React from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';

import {connect} from 'react-redux';
import {ChangeTab} from '../redux/Actions';

 class CreatePostScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  navigateToCamera=()=>{
    this.props.dispatch(ChangeTab(4));
  } 
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pageTitle}>
            <Text style={styles.titleFont}>Create an Idea</Text>
        </View>
        <View style={styles.boxes}>
            <View style={styles.box}><Text>gallery</Text></View>
            <View style={styles.verticalHairline}/>
            <View style={styles.box}>
              <TouchableOpacity onPress={this.navigateToCamera}>
                <Image 
                  source={require('../assets/images/camera.png')}
                  style={styles.imgIcon}
                  />
              </TouchableOpacity>
              
          </View>
    
        </View>
        <View style={[styles.items, styles.title]}>
          <TextInput
              placeholder='Title'
          />
        </View>
        <View style={styles.hairline} />
        <View style={[styles.items, styles.content]}>
           <TextInput
              placeholder='Content'
            />  
        </View> 
        <View style={styles.hairline} />
        
        <View style={[styles.items, styles.hashtag]}>
            <TextInput
              placeholder='# Add Hashtags'
            />
        </View>
        <View style={styles.butBox}> 
            <TouchableOpacity onPress={this.handleLogin}> 
                    <View style={[styles.signBut]}>
                        <Text style={styles.buttonText}>POST</Text>
                    </View>
            </TouchableOpacity>
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.3,
    width: '100%'
  },
  verticalHairline:{
    backgroundColor: '#A2A2A2',
    height: 150,
    width: 0.5
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
  boxes: {
    flexDirection:'row',
    width:'100%',
    marginTop:0,
  },
  box: {
    width:'50%',
    paddingLeft:'15%',
    paddingRight:'15%',
    height:150,
    backgroundColor:"#F2F2F2",
    alignContent:'center',
    justifyContent:'center'
  },
  items: {
    width:'100%',
    padding:10,
  },
  title: {
    height:'10%'  
  },
  content: {
    height:'25%' 
  },
  hashtag: {
    height:'10%'
  },
  buttonText:{
    fontSize:17,
    color:"#fff",
    fontWeight:"300",
  },
  signBut:{
    alignItems:'center',
    margin:5,
    padding:15,
    borderRadius:10,
    backgroundColor:'#138172',
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 1,
  },
  butBox: {
    flexDirection:'column',
    width:'80%'  
  },
  imgIcon:{
    width:'100%',
    resizeMode:'contain'
  }
});

function mapStateToProps(state){
  return {
    tab:state.Page.tab
  }
}

export default connect (mapStateToProps)(CreatePostScreen);