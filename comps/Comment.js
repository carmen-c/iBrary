import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground, ScrollView,TouchableOpacity } from 'react-native';

import {connect} from 'react-redux';
import {ChangeTab} from '../redux/Actions';

class Comment extends React.Component {
  
  handleSelected=()=>{
//    console.log("clicked: ", this.props.postid);
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.list} refs={this.props.commentid} onPress={this.handleSelected}>
            <View>
            <Text>{this.props.comment}</Text>
            <Text>dd</Text>
              </View>
          </TouchableOpacity>
        </View>
    );
  }
}

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


function mapStateToProps(state){
  return {
    page:state.Page.page,
    tab: state.Page.tab
  }
}
export default connect (mapStateToProps)(Comment);