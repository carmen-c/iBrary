import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

export default class Search extends React.Component {
  static navigationOptions = {
    header: null,
  };

searchData=()=>{}

  render() {
    return (
      <View style={styles.container}>
          <TextInput
            placeholder="Search"
            onChange={this.searchData}
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

