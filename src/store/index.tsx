import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth'
import profileReducer from './profile'
import servicesReducer from './services';
import topupReducer from './topup';
import balanceReducer from './balance';
import transactionReducer from './transaction';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    services: servicesReducer,
    topup: topupReducer,
    balance: balanceReducer,
    transaction: transactionReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
