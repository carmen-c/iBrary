import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Post extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          //user image
          //username
          //timestamp
        </View>
        <View>
          //post content
        </View>
        <View>
          //post like count
          //comments count
        </View>
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

