import React from 'react';
import { View, StyleSheet, Text, Button, Image, ImageBackground } from 'react-native';

export default class Post extends React.Component {

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View>
        <Text>{this.props.title}</Text>
        </View>
        <Text>{this.props.content}</Text>
      </View>
    );
  }
}