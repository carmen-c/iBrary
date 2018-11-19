import React from 'react';
import { View, StyleSheet, Text, Flatlist, Button, TouchableOpacity, Image } from 'react-native';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/Actions';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const items = [
  {  
    name: "category",
    id: 0,
    children: [{
        name: "Application",
        id: 10,
      },{
        name: "Graphics",
        id: 17,
      },{
        name: "Video",
        id: 13,
      },{
        name: "Marketing",
        id: 14,
      }]
  },
  ]
class Interest extends React.Component {

 
state={
  cat1BG:'rgba(255,255,255,0.5)',
  cat2BG:'rgba(255,255,255,0.5)',
  cat3BG:'rgba(255,255,255,0.5)',
  cat4BG:'rgba(255,255,255,0.5)',
  selectedItems: [],
}
 onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }
  handleCategory=(type)=>{
    if(type === "app"){
      this.setState({
      cat1BG:'rgba(255,255,255,1)'
      })
    }
    if(type === "video"){
      this.setState({
      cat2BG:'rgba(255,255,255,1)'
      })
    }
    if(type === "product"){
      this.setState({
      cat3BG:'rgba(255,255,255,1)'
      })
    }
    if(type === "campagin"){
      this.setState({
      cat4BG:'rgba(255,255,255,1)'
      })
    }
  }
    
  navigatePage=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  render() {
    return (
    
    
        
  <View style={styles.container}>
    
          
        <TouchableOpacity 
           style={styles.backBut}
           onPress={this.navigatePage.bind(this,2)}> 
              <Image 
                  style={styles.backBut}
                  source={require('../assets/images/backButton.png')}
                />
        </TouchableOpacity>
        <View style={styles.center}>
        <View style={styles.pageTitle}>
            <Text style={styles.titleFont}>Interest</Text>
        </View>
          
        <Text style={styles.pageDes}>Tap on the categories you like</Text>
     
        {/*
        <View style={styles.boxes}>
          <TouchableOpacity 
            style={[styles.box,{backgroundColor:this.state.cat1BG}]}
            onPress={this.handleCategory.bind(this,'app')}
            >
            <Text style={styles.featureText}>APP</Text>
          </TouchableOpacity>
    
          <TouchableOpacity 
            style={[styles.box,{backgroundColor:this.state.cat2BG}]}
            onPress={this.handleCategory.bind(this,'video')}
            >
            <Text style={styles.featureText}>VIDEO</Text>
          </TouchableOpacity>
        </View>
       <View style={styles.boxes}>
          <TouchableOpacity 
            style={[styles.box,{backgroundColor:this.state.cat3BG}]}
            onPress={this.handleCategory.bind(this,'product')}
            >
            <Text style={styles.featureText}>PRODUCT</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.box,{backgroundColor:this.state.cat4BG}]}
            onPress={this.handleCategory.bind(this,'campagin')}
            >
            <Text style={styles.featureText}>CAMPAGIN</Text>
          </TouchableOpacity>
        </View>
       */}    
        
          <SectionedMultiSelect
              style={{width:'100%', height:100}}
          items={items} 
          uniqueKey='id'
          subKey='children'
          selectText='Choose some thing...'
          showDropDowns={false}
          readOnlyHeadings={false}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
        />
          
        <View style={styles.butBox}>
            <TouchableOpacity onPress={this.navigatePage.bind(this,7)}> 
                <View style={[styles.signBut] }>
                    <Text style={[styles.buttonText]}>NEXT </Text>
                </View>
            </TouchableOpacity>
        </View>
        </View> 
    </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%', 
    flex:1,
  },
  backBut: {
    width:22,
    height:22,
    position:'absolute',
    left:3,
    top:13,
    resizeMode:'contain',
    zIndex:50
  },
  center: {
    alignItems:'center'
  },
  pageTitle: {
    marginTop:65,
    marginBottom:10,
    width:'100%',
//    backgroundColor:'#e6e6e6',
//    alignContent:'center',
    alignItems:'center',
  },
  titleFont:{
    fontSize:25,
    fontWeight: 'bold',
    color:'#138172'
  },
  pageDes:{
    marginTop:5,
    marginBottom:20,
    fontSize:16
  },
  boxes:{
    width:'75%',
//    backgroundColor:'red',
    marginBottom:20,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  box: { 
    width:'45%',
    height:180,
    padding:'5%',
    borderRadius:20,
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
  },
  featureText: {
    textAlign:'center' 
  },
  butBox: {
    flexDirection:'column',
    width:'80%',
  },
  buttonText:{
    fontSize:17,
    color:'#fff',
    fontWeight:"300",
  },
  signBut:{
    alignItems:'center',
    margin:5,
    padding:15,
    borderRadius:10,
    backgroundColor:'#138172',
    shadowOffset:{  width: 0,  height: 5,  },
    shadowRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 1,
  },
});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}
 
export default connect (mapStateToProps)(Interest);
