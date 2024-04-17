import { UPDATE_CONTACT, UPDATE_CONTACT_ERROR } from '../constants';

const initialState = {
  data: [],
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_CONTACT:
      return {
        data: action.payload,
        error: null,
      };

    case UPDATE_CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
