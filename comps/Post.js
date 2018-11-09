import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground, ScrollView,TouchableOpacity } from 'react-native';

import {connect} from 'react-redux';
import {ChangeTab, SelectItem} from '../redux/Actions';

class Post extends React.Component {
  
  handleSelected=()=>{
    //pass or save all post props
    this.props.dispatch(SelectItem(this.props.postid, this.props.userid, this.props.username,this.props.title, this.props.content, this.props.img));
    //change page
    this.props.dispatch(ChangeTab(4));
    console.log("clicked: ", this.props.postid, this.props.img);
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.list} refs={this.props.postid} onPress={this.handleSelected}>
            <View>
              <View style={{flexDirection:'row'}}>
                <Image style={{ width:30, height:30, marginRight:7}} source={require('../assets/images/profileDefault.png')} />
                <Text style={{fontSize:15, color:'#7a7979', marginTop:5}}>{this.props.username}</Text>
              </View>
             <Image style={{ width:30, height:30, marginRight:7}} source={{ uri: (this.props.img) ? this.props.img : "" }} />
            <Text style={{fontSize: 20, marginBottom:10, marginTop:5, fontWeight:'bold', marginTop:5, marginLeft:5}}>{this.props.title}
            </Text>
            <Text style={{fontSize: 16, marginLeft:5}}>{this.props.content}</Text>
            </View> 
            
          </TouchableOpacity>
        </View>
    );
  }
}

function mapStateToProps(state){
  return {
    page:state.Page.page,
    tab: state.Page.tab
  }
}
export default connect (mapStateToProps)(Post);

const styles = StyleSheet.create({
  container: {
    width:"100%",
    alignItems:'center',
  },
  list:{
    width:'95%',
    backgroundColor:'#fff',
    marginBottom:20,
    borderRadius:10,
    padding:15
  }

});