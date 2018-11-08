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

export function SelectItem(postid, userid, username, title, content) {
  return {
    type:"SELECTED_ITEM",
    postid: postid,
    userid: userid,
    username: username,
    title: title,
    content: content,
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

export function SelectProfileImg(Pimg) {
  return {
    type:"SELECTED_PROFILEIMG",
    Pimg:Pimg
  }
}

export function SelectPostImg(postimg) {
  return {
    type:"SELECT_POSTIMG",
    postImg:postImg
  }
}