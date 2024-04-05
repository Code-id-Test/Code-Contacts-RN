import { thunk } from 'redux-thunk';
import { contactsListReducer, setContactReducer } from './reducers';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  contactsList: contactsListReducer,
  setContact: setContactReducer,
});

// const preloadedState = {};
// const store = configureStore({
//   reducer: rootReducer,
//   preloadedState,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
