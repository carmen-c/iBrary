//combine all reducers
import {combineReducers} from 'redux';
import {Page} from './Reducers';

const myApp = combineReducers({
  //reducers
  Page
})

export default myApp;