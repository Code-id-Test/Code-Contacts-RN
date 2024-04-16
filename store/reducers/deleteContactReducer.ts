import { DELETE_CONTACT, SET_ERROR } from '../constants';

const initialState = {
  data: '',
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case DELETE_CONTACT:
      return {
        ...state,
        data: state.data.filter(),
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
