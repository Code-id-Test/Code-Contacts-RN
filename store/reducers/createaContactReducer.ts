import { CREATE_CONTACT, CREATE_CONTACT_ERROR } from '../constants';

const initialState = {
  data: [],
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_CONTACT:
      return {
        data: action.payload,
        error: null,
      };

    case CREATE_CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
