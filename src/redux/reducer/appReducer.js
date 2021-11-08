const INITIAL_STATE = {
  openMenu: false,
  homePage: true,
  changePage : true,
  colorFooter: "",
  background : "bgHome"

}

export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CHANGEPAGE" : {
      return {
        ...state,
        changePage : !state.changePage
      }
    }
    case "OPENMENU": {
      return {
        ...state,
        openMenu: !state.openMenu 
      }
    }
    case "HOMEPAGE": {
      return {
        ...state, 
        homePage: action.payload
      }
    }
    case "COLORFOOTER": {
      return {
        ...state, 
        colorFooter: action.payload
      }
    }

    case "BACKGROUND" : {
      return {
        ...state, 
        background: action.payload
      }
    }
    
    default: {
      return {
        ...state
      }
    }
  }
}