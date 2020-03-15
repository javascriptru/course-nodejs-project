import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import authReducer from './modules/auth/reducer';
import categoriesReducer from './modules/categories/reducer';
import chatReducer from './modules/chat/reducer';
import ordersReducer from './modules/orders/reducer';
import productsReducer from './modules/products/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    chat: chatReducer,
    orders: ordersReducer,
    products: productsReducer,
  }),
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);
