/* eslint-disable default-case */
const INITIAL_STATE = {
  cart:[],
}

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADDITEM": {
      return {
        ...state
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}