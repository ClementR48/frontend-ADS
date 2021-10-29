import {createStore, applyMiddleware, combineReducers} from 'redux';
import cartReducer from './reducer/cartReducer';
import productsReducer from './reducer/productsReducer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  productsReducer,
  cartReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store;