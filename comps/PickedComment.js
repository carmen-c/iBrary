import React from 'react';
import { View, 
        StyleSheet, 
        Text, 
        Button, 
        Image, 
        ImageBackground, 
        ScrollView,
        TouchableOpacity 
       } from 'react-native';
import Swipeout from 'react-native-swipeout';
import {db} from '../constants/FConfig';

export default class PickedComment extends React.Component {
  
  deleteFromPost=()=>{
    db.ref('comments/' + this.props.commentid).update({
        picked: false
    }).then(()=>{
      this.props.refresh();
    });
    
  }

  render() {
    
    var swipeoutBtns = [
      {
       text:'Delete', 
       backgroundColor:'#138172', 
       onPress:this.deleteFromPost
      }
    ]
    
    return (
      
        <View style={styles.container}>
       
        <Swipeout 
          style={{width:'100%'}}
        left={swipeoutBtns}
        autoClose={true}
        backgroundColor="#fff"
        >
          <TouchableOpacity style={styles.list} refs={this.props.commentid}>
            <View>
             
              <View style={{flexDirection:'row',  backgroundColor:'rgba(86,173,161,0.5)', padding:10, borderRadius:5, width:'100%', flexWrap:'wrap'}}>
                <View>
                  <Text style={styles.username}>{this.props.username}</Text>
                </View>
                
                <View style={{width:'75%'}}>
                  <Text>{this.props.comment}</Text>
                </View>
                
              </View>
               
            </View>
          </TouchableOpacity>
            </Swipeout>
        </View>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    alignItems:'center',
    marginBottom:15
  },
  list:{
    width:'100%',
    alignItems:'center',
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.6,
    width: '90%'
  },
  username:{
    fontWeight:'bold',
    marginRight:10,
  }

});