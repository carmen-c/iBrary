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
            </View>
          </TouchableOpacity>
          <View style={styles.hairline}/>
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
    width:'90%',
    padding:7,
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.6,
    width: '85%'
  },

});


function mapStateToProps(state){
  return {
    page:state.Page.page,
    tab: state.Page.tab
  }
}
export default connect (mapStateToProps)(Comment);