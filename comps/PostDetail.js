import React from 'react';

import { View, 
        StyleSheet, 
        Text, 
        TextInput,
        Button, 
        Image, 
        ImageBackground, 
        ScrollView,
        TouchableOpacity, 
        KeyboardAvoidingView, 
        Modal
       } from 'react-native';

import {connect} from 'react-redux';
import {ChangeTab, UpdateProgress} from '../redux/Actions';

import {auth, db} from '../constants/FConfig';
import CreateComment from './CreateComment';
import CommentList from './CommentList';
import PickedCommentList from './PickedCommentList';

class PostDetail extends React.Component {
  
  state={
    content: this.props.content,
    button: "progress",
    modal: false,
    progress: this.props.progress
  }
  
  check=()=>{
    console.log("POSTDETAIL: ", this.props.userid)
    if (auth.currentUser.uid == this.props.userid){
      //enable editing stuff
      return (<Text>...</Text>)
    } else {
      
    }
  }
  
  navigateToHome=()=>{
    this.props.dispatch(ChangeTab(1));
  }
  
  addProgress=()=>{
    this.setState({modal: true})
  }
  
  viewProgress=()=>{
    if(this.state.button == "progress"){
      this.setState({content: this.props.progress, button: "content"})
    } else {
      this.setState({content: this.props.content, button: "progress"})
    }
  }
  
  saveProgress=()=>{
    db.ref('posts/' + this.props.postid).update({
      progress: this.state.progress
    });
    this.props.dispatch(UpdateProgress(this.state.progress));
    this.setState({modal: false})
  }

  render() {
    var editIcon = null;
    if(auth.currentUser.uid == this.props.userid){
      editIcon=(
        <View style={{position:'absolute', right:10, top:23, flexDirection:'row'}}>
          <TouchableOpacity onPress={this.addProgress}>
            <Text style={{fontWeight:'600', opacity:0.8, paddingRight:20}}>
              Add Progress
              </Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text style={{fontWeight:'600', opacity:0.8, paddingRight:10}}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      ) 
    }
    
    var btntxt = "";
    if(this.state.button == "progress"){
      btntxt = "VIEW PROGRESS";
    } else {
      btntxt = "VIEW IDEA";
    }
    
    this.check();
    return (
      <View style={styles.container}>
        <Modal
          animationType='fade'
          visible={this.state.modal}
          >
        <View>
          <TextInput
            style={{fontSize:16, height:300}}
            placeholder='Add Progress'
            value={this.state.progress}
            multiline={true}
            keyboardType='default'
            onChangeText={(text)=> this.setState({progress: text})}
          />
          <TouchableOpacity onPress={this.saveProgress}> 
            <View style={styles.signBut}>
                <Text style={styles.buttonText}>SAVE</Text>
            </View>
          </TouchableOpacity>
        </View>
        </Modal>
     
        <View style={{ width:'100%'}}>
          <TouchableOpacity 
           onPress={this.navigateToHome}> 
           <Image 
              style={styles.backBut}
              source={require('../assets/images/backButton.png')}
            />         
          </TouchableOpacity>
           {editIcon}
        </View>
      
       <KeyboardAvoidingView style={{marginTop:57}} behavior="position" enabled>
        <ScrollView style={{margionTop:0}}>
        <View style={styles.contents}>
          <View style={styles.posting}>
            
            <View style={{width:'90%', marginTop:10, height:50, flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row'}}>
                <Image 
                  style={{ width:35, height:35, marginRight:10, borderRadius:17.5}} 
                 source={(this.props.userimg) ? { uri: this.props.userimg} : require('../assets/images/profileDefault.png') }/>
                
                <Text style={{fontWeight:'bold', fontSize:18, color:'#7a7979', marginTop:7}}>{(this.props.username) ? this.props.username : "Usename"}</Text>
              </View>
             
              <View style={{width:30}}>
                <TouchableOpacity>
                  <Image 
                  style={{ width:30, height:30, marginRight:10, resizeMode:'contain'}} 
                  source={require('../assets/images/progress.png')}/>
                </TouchableOpacity>
              </View>
            </View>
                
            <View style={{width:'85%', marginBottom:10}} >
              <View style={{alignItems:'center'}} refs={this.props.postid}>
                <Image 
                  style={{width:200, height:200, marginBottom:5, borderRadius:5}} 
                  source={(this.props.img) ? { uri: this.props.img} : require('../assets/images/defaultPostingImg.png') } />
                <Text style={{fontSize: 20, marginTop:15,marginBottom:15, fontWeight: 'bold',}}>
                 {this.props.title}
                </Text>
              </View>
              <Text>{this.state.content}</Text>
            </View>
            
            <View style={{width:'90%'}}>
               <Text style={{fontWeight:'600', color:'#bbb', marginBottom:5, }}>Category : {this.props.category}</Text>
            </View>
            
            <View style={{width:'100%'}}>
               <PickedCommentList pickedComments={this.props.picked}/>
            </View>
            
            <View>
            <TouchableOpacity onPress={this.viewProgress}> 
                <View style={styles.signBut}>
                    <Text style={styles.buttonText}>{btntxt}</Text>
                </View>
            </TouchableOpacity>
          </View>

          </View>
          
          <View style={{width:'100%',alignItems:'center', paddingBottom:80, backgroundColor:'#fff'}}> 
            <View style={{width:'90%'}}>
              <Image 
              style={{width:25, height:20, resizeMode:'contain'}}
              source={require('../assets/images/comment.png')}/>
            </View>
            <CommentList postid={this.props.postid}/> 
            <View style={styles.hairline}/>
            <CreateComment postid={this.props.postid}/>
            <View style={styles.hairline}/>
          </View>
          
        </View>
      </ScrollView>
    
      
      </KeyboardAvoidingView>
         </View> 
    );
  }
}

function mapStateToProps(state){
  return {
    page:state.Page.page,
    tab: state.Page.tab,
    postid:state.SelectPost.postid,
    userid:state.SelectPost.userid,
    title:state.SelectPost.title,
    content:state.SelectPost.content,
    username:state.SelectPost.username,
    img:state.SelectPost.img,
    picked:state.SelectPost.picked,
    category:state.SelectPost.category,
    userimg:state.SelectPost.userimg,
    progress:state.SelectPost.progress
  }
}
export default connect (mapStateToProps)(PostDetail);


const styles = StyleSheet.create({
  container: {
    position:'absolute',
    width:'100%',
    height:'100%',
  },
  contents:{
    width:'100%',
    height:'100%', 
    backgroundColor:'#fff',  
  },
  posting:{
    width:'100%', 
    margin:0,
    alignItems:'center'
  },
  comments: {
    width: "100%",
    flex: 1
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.8,
    opacity:0.3,
    width: '90%'
  },
  list:{
    width:'95%',
    backgroundColor:'#fff',
    marginBottom:20,
    borderRadius:10,
    padding:15
  },
  backBut: {
    width:22,
    height:22,
    position:'absolute',
    left:5,
    top:23,
    resizeMode:'contain',
    zIndex:50
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
  buttonText:{
    fontSize:17,
    color:'#fff',
    fontWeight:"300",
  },
  

});