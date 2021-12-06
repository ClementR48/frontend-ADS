/* eslint-disable default-case */
const INITIAL_STATE = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
    openCheckout: false,
    openPayment: false
};

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADDITEM": {
      const indexItemAdd = state.cart.findIndex(
        (obj) => obj.id === action.payload.id
      );
      if (indexItemAdd !== -1) {
        const updateQuantity = {
          ...state.cart[indexItemAdd],
          quantity: state.cart[indexItemAdd].quantity + action.payload.quantity,
        };
        const newArr = [...state.cart];
        newArr.splice(indexItemAdd, 1, updateQuantity);
        localStorage.setItem('cartItems', JSON.stringify(newArr))
        return {
          cart: newArr,
        };
      } else {
        const newArr = [...state.cart];
        newArr.push(action.payload);
        localStorage.setItem('cartItems', JSON.stringify(newArr))
        return {
          cart: newArr,
        };
      }
    }
    case "UPDATEITEM": {
      const indexItemUpdated = state.cart.findIndex(
        (obj) => obj.id === action.payload.id
      );

      const newArr = [...state.cart];
      newArr.splice(indexItemUpdated, 1, action.payload);
      localStorage.setItem('cartItems', JSON.stringify(newArr))
      return {
        cart: newArr,
      };
    }
    case "DELETEITEM": {
      const indexItemDeleted = state.cart.findIndex(
        (obj) => obj.id === action.payload.id
      );
      const newArr = [...state.cart];
      newArr.splice(indexItemDeleted, 1);
      localStorage.setItem('cartItems', JSON.stringify(newArr))
      return {
        cart: newArr,
      };
    }
    case 'OPENCHECKOUT' : {
      return {
        ...state,
        openCheckout: !state.openCheckout
      }
    }
    case 'OPENPAYMENT' : {
      return {
        ...state,
        openPayment: !state.openPayment
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
