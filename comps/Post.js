import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground, ScrollView,TouchableOpacity } from 'react-native';

export default class Post extends React.Component {

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.list} refs={this.props.postid}>
            <View>
            <Text style={{fontSize: 20, marginBottom:10}}>{this.props.title}</Text>
            </View>
            <Text>{this.props.content}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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