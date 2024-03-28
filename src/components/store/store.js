import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './authSlice';
import InboxReducer from './inboxSlice'
import sentboxReducer from './sentboxSlice'


const store = configureStore({
  reducer: { auth: AuthReducer, inbox: InboxReducer, sentbox: sentboxReducer},
});

export default store;
