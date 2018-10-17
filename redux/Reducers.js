//update state variables
const pageDefault ={
  page:1,
  tab: 1,
};

export function Page(state= pageDefault, action) {
  let obj = Object.assign({}, state);
  
  switch(action.type) {
    case "CHANGE_PAGE":
      obj.page = action.curpage;
      return obj;
      
    case "CHANGE_TAB":
      obj.tab = action.curtab;
      return obj;
      
    default:
      return state;
  }
}


//for storing global background color state variable
//const bgDefault = {
//  bgcolor: "#FFFFFF"
//}
//export function Background(state= bgDefault, action) {
//  let obj = Object.assign({}, state);
//  
//  switch(action.type) {
//    case "CHANGE_BG":
//      //same as setState
//      obj.bgcolor = action.bgcolor;
//      return obj;
//    default:
//      return state;
//  }
//}