import React from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';

export default class CreatePostScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Create an Idea</Text>
        <TextInput
          placeholder="Title"
        />
        <TextInput
          placeholder="Content"
        />
        <TextInput
          placeholder="# Add Hashtags"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

