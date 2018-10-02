import React from 'react';
import { View, StyleSheet, Text, Flatlist } from 'react-native';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        
        <Text>Categories</Text>
        <Flatlist
          data={[dictionary]}    
          renderItem={({item}) => <Text>{item.key}</Text>}
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

