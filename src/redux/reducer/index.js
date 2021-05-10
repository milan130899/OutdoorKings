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
};

const allReducers = combineReducers({
  errorReducer: errorReducer,
  orderReducer: orderReducer,
  tokenReducer: tokenReducer,
  userDetails: userDetailsReducer,
  viewOrder: viewOrderReducer,
  prfile: profileReducer,
});
const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
