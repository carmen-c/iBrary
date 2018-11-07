//combine all reducers
import {combineReducers} from 'redux';
import {Page, SelectPost, Profile} from './Reducers';

const myApp = combineReducers({
  //reducers
  Page, SelectPost, Profile
})

export default myApp;