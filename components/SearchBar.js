import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements'

export default class Search extends React.Component {
  static navigationOptions = {
    header: null,
  };

searchData=()=>{}

  render() {
    return (
      <View style={styles.container}>
             <View style={styles.searchBar}>
          <TextInput
            placeholder='Search'
            onChange={this.searchData}
          /> 
            </View>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection:'column',
    width:'85%',
    margin:20,
    padding:5,
    backgroundColor:'#FFF',
    borderRadius:10,
    shadowOffset:{  width: 0,  height: 3,  },
    shadowRadius: 3,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
  }
});

