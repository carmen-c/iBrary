import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Login from '../comps/Login';
import Welcome from '../screens/WelcomeScreen';
import SignUp from '../comps/SignUp';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';

class Main extends React.Component {
  
  handleButton=(page)=>{
 this.props.dispatch(ChangePage(page));
  }
  render() {
    var curpage = <Login/>;
    
    //we are changing state to use the global state
    switch(this.props.page){

      case 1:
        curpage = <Login />
        break;
      case 2:
        curpage = <Welcome />
        break;
      case 3:
        curpage = <SignUp />
        break;
    }
    
    return (
      <View style={styles.container}>
        {curpage}
        <View>
          <Text>Tab bar here</Text> 
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

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect (mapStateToProps)(Main);