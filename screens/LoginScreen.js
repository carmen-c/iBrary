import React from 'react';
import {
  Image,
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state={
    first: 1
  }
  handleLogin=()=>{
    if(this.state.first == 0){
      this.setState({ first: 1 })
      this.props.navigation.navigate('Welcome')
      
    } else if(this.state.first == 1){
      this.props.navigation.navigate('Main')
    }
    console.log(this.state)
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>logo and images here later</Text>
        </View>
        
        <TextInput
          placeholder="email"
        />
        <TextInput
          placeholder="email"
        />
        <Button
          title="Login"
          onPress={this.handleLogin}
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
