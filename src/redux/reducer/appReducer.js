const INITIAL_STATE = {
  openMenu: false,
  homePage: true

}

export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "OPENMENU": {
      return {
        ...state,
        open: !state.open 
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