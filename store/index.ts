import { thunk } from 'redux-thunk';
import {
  contactDetailsReducer,
  contactsListReducer,
  deleteContactReducer,
  setContactReducer,
} from './reducers';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  contactDetails: contactDetailsReducer,
  contactsList: contactsListReducer,
  setContact: setContactReducer,
  deleteContact: deleteContactReducer,
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
