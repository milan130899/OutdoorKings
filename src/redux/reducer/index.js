import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import thunk from 'redux-thunk';

import errorReducer from './errorReducer';
import orderReducer from './orderReducer';
import tokenReducer from './tokenReducer';
import userDetailsReducer from './userDetailsReducer';
import viewOrderReducer from './viewOrderReducer';
import profileReducer from './profileReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login_token', 'data', 'orderData'],
};

const allReducers = combineReducers({
  errorReducer: errorReducer,
  orderReducer: orderReducer,
  tokenReducer: persistReducer(persistConfig, tokenReducer),
  userDetails: persistReducer(persistConfig, userDetailsReducer),
  viewOrder: persistReducer(persistConfig, viewOrderReducer),
  prfile: profileReducer,
});
export const store = createStore(allReducers, applyMiddleware(thunk));
export const persistor = persistStore(store);
