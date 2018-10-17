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