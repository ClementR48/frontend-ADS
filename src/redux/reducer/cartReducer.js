/* eslint-disable default-case */
const INITIAL_STATE = {
  cart:[],
}

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADDITEM": {
      const indexItemAdd = state.cart.findIndex((obj) => obj.id === action.payload.id);
      if(indexItemAdd !== -1) {
        const updateQuantity = {
          ...state.cart[indexItemAdd],
          quantity: state.cart[indexItemAdd].quantity + action.payload.quantity,
        }
        const newArr = [...state.cart];
        newArr.splice(indexItemAdd, 1, updateQuantity);
        console.log(newArr);
        return {
          cart: newArr
        }
      }
      else {
        const newArr = [...state.cart];
        newArr.push(action.payload);
        return {
          cart: newArr
        }
      }

    }
    case "UPDATEITEM" : {
      const indexItemUpdated = state.cart.findIndex((obj) => obj.id === action.payload.id)

      const newArr = [...state.cart];
      newArr.splice(indexItemUpdated, 1, action.payload);

      return {
        cart: newArr
      }
    }
    case "DELETEITEM": {
      const indexItemDeleted = state.cart.findIndex((obj) => obj.id === action.payload.id)

      const newArr = [...state.cart];
      newArr.splice(indexItemDeleted, 1)
      return {
        cart: newArr
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}