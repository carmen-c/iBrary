//build functions to change global state

export function ChangePage(page) {
  return {
    type:"CHANGE_PAGE",
    curpage:page
  }
}

export function ChangeTab(tab) {
  return {
    type:"CHANGE_TAB",
    curtab:tab
  }
}

export function SelectItem(postid, userid, title, content, username) {
  return {
    type:"SELECTED_ITEM",
    postid: postid,
    userid: userid,
    title: title,
    content: content,
    username: username
  }
}

export function SavedProfile( userid, name, bio, img) {
  return {
    type:"SAVED_PROFILE",
    userid: userid,
    name: name,
    bio: bio,
    img:img
  }
}