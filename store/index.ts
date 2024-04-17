import { thunk } from 'redux-thunk';
import {
  contactDetailsReducer,
  contactsListReducer,
  updateContactReducer,
} from './reducers';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from '@reduxjs/toolkit';
import deleteContactReducer from './reducers/deleteContactReducer';
import createaContactReducer from './reducers/createaContactReducer';

const rootReducer = combineReducers({
  contactDetails: contactDetailsReducer,
  contactsList: contactsListReducer,
  createContact: createaContactReducer,
  updateContact: updateContactReducer,
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
