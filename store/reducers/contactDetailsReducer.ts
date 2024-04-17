import { GET_CONTACT_DETAILS, GET_CONTACT_DETAILS_ERROR } from '../constants';

const initialState = {
  data: '',
  error: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CONTACT_DETAILS:
      return {
        data: action.payload,
        error: null,
      };

    case GET_CONTACT_DETAILS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
