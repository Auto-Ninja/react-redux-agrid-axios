// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
