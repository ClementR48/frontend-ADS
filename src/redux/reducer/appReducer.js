const INITIAL_STATE = {
  openMenu: false,
  homePage: true,
  changePage : 0,
  underlineNav : ''

}

export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CHANGEPAGE" : {
      return {
        ...state,
        changePage : action.payload
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
    
    default: {
      return {
        ...state
      }
    }
  }
}