import { db } from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const INITIAL_STATE = {
  openMenu: false,
  changePage: true,
  homeData: [],
  aboutData: [],
  contactData: [],
  cartData: [],
};

export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOADDATAHOME": {
      return {
        ...state,
        homeData: action.payload,
      };
    }
    case "LOADDATAABOUT": {
      return {
        ...state,
        aboutData: action.payload,
      };
    }
    case "LOADDATACONTACT": {
      return {
        ...state,
        contactData: action.payload,
      };
    }
    case "LOADDATACART": {
      return {
        ...state,
        cartData: action.payload,
      };
    }
    case "CHANGEPAGE": {
      return {
        ...state,
        changePage: !state.changePage,
      };
    }
    case "OPENMENU": {
      return {
        ...state,
        openMenu: !state.openMenu,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
}

const homeCollectionRef = collection(db, "Home");
export const getHomeData = () => async (dispatch) => {
  const data = await getDocs(homeCollectionRef);
  const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  await dispatch({
    type: "LOADDATAHOME",
    payload: newData,
  });
};
const aboutCollectionRef = collection(db, "About");
export const getAboutData = () => async (dispatch) => {
  const data = await getDocs(aboutCollectionRef);
  const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  await dispatch({
    type: "LOADDATAABOUT",
    payload: newData,
  });
};
const contactCollectionRef = collection(db, "Contact");
export const getContactData = () => async (dispatch) => {
  const data = await getDocs(contactCollectionRef);
  const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  await dispatch({
    type: "LOADDATACONTACT",
    payload: newData,
  });
};
const cartCollectionRef = collection(db, "Cart");
export const getCartData = () => async (dispatch) => {
  const data = await getDocs(cartCollectionRef);
  const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  await dispatch({
    type: "LOADDATACART",
    payload: newData,
  });
};
