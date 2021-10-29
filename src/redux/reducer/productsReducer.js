import { db } from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const INITIAL_STATE = {
  products: [],
};

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOADPRODUCTS": {
      return {
        ...state,
        products: action.payload,
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
