import {createStore, applyMiddleware, combineReducers} from 'redux';
import cartReducer from './reducer/cartReducer';
import productsReducer from './reducer/productsReducer';
import appReducer from './reducer/appReducer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  productsReducer,
  cartReducer,
  appReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store;