import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ticketReducer from './tickets/ticketSlice';


export const Store = configureStore({
  reducer: {
    user: userReducer,
    tickets: ticketReducer,
  },
});
