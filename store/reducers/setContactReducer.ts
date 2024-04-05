import { SET_CONTACT, SET_ERROR } from '../constants';

const initialState = {
  data: [],
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CONTACT:
      return {
        data: action.payload,
        error: null,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
