import { db } from "../../utils/firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const INITIAL_STATE = {
  products:[],
  productsBeforeBuy: [],
  productsToShow:[],
  category: "tout",
};

export default function productReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOADPRODUCTS": {
      return {
        ...state,
        productsBeforeBuy: action.payload,
        products: action.payload,
      };
    }

    case "UPDATEPRODUCTFROMPRODUCT": {
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
        ...state,
        products: newArr,
      };
    }

    case "UPDATEPRODUCTFROMCART": {
      const indexProduct = state.products.findIndex(
        (obj) => obj.id === action.payload.id
      );

      const updateQuantity = {
        ...state.products[indexProduct],
        quantity:
          state.productsBeforeBuy[indexProduct].quantity -
          action.payload.quantity,
      };
      const newArr = [...state.products];
      newArr.splice(indexProduct, 1, updateQuantity);
      
      return {
        ...state,
        products: newArr,
      };
    }
    case "PRODUCTSTOSHOW":
      {
        if (action.payload !== "tout") {
          const newArr = state.products.filter(
            (product) => product.category.name === action.payload
          );
          
          return {
            ...state,
            productsToShow: newArr,
            category: action.payload,
          };
        } else if (action.payload === "tout") {
          
          return {
            ...state,
            productsToShow: state.products,
            category: action.payload,
          };
        }
      }
    // eslint-disable-next-line no-fallthrough
    case "UPDATEPRODUCTAFTERBUY":
      {
        const indexProduct = state.products.findIndex(
        (obj) => obj.id === action.payload.id
      );

        const upadteProduct = async (id) => {
          const ProductDoc = doc(db, "Product", id);
           
            const newFields = {
              
              quantity: state.products[indexProduct].quantity - action.payload.quantity,
            };
            await updateDoc(ProductDoc, newFields);
            
          
        };

        upadteProduct(action.payload.id)
        
          
          return {
            ...state
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
