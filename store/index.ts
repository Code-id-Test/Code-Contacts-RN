import { contactsListReducer } from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = () => ({
  contactsList: contactsListReducer,
});

const preloadedState = {};
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
