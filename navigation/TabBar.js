import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Home from '../comps/Home';

import {connect} from 'react-redux';
import {ChangePage, ChangeTab} from '../redux/Actions';

class TabBar extends React.Component {
  
  handleButton=(tab)=>{
    this.props.dispatch(ChangeTab(tab));
  }
  
  render() {
    var curtab = <Home/>;
    
    //we are changing state to use the global state
    switch(this.props.tab){

      case 1:
        curtab = <Home />
        break;
    }
    
    return (
      <View style={styles.container}>
        {curtab}
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
    tab:state.Page.tab
  }
}

export default connect (mapStateToProps)(TabBar);