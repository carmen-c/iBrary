//combine all reducers
import {combineReducers} from 'redux';
import {Page, SelectPost} from './Reducers';

const myApp = combineReducers({
  //reducers
  Page, SelectPost
})

export default myApp;