import { db } from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const INITIAL_STATE = {
  products: [],
};

export default function productReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOADPRODUCTS": {
      return {
        ...state,
        products: action.payload,
      };
    }

    case "UPDATEPRODUCT": {
      const indexProduct = state.products.findIndex(
        (obj) => obj.id === action.payload.id
      );

      const updateQuantity = {
        ...state.products[indexProduct],
        quantity:
          state.products[indexProduct].quantity - action.payload.quantity,
      };
      const newArr = [...state.products];
      newArr.splice(indexProduct, 1, updateQuantity);

      return {
        products: newArr,
      };
    }
    
    default: {
      return {
        ...state,
      };
    }
  }
}

const productsCollectionRef = collection(db, "Product");
export const getProducts = () => async (dispatch) => {
  const data = await getDocs(productsCollectionRef);
  const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  await dispatch({
    type: "LOADPRODUCTS",
    payload: newData,
  });
};
