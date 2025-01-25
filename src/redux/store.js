// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataProductReducer from './productSlice';
import dataCategoryReducer from './categorySlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    products: dataProductReducer,
    categories: dataCategoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
