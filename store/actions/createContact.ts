import axios from 'axios';
import { CREATE_CONTACT, SET_ERROR } from '../constants';
import { ContactProps_Data } from '../../src/types/dataTypes';

interface CreateContactProps {
  data: Partial<ContactProps_Data>;
  onSuccess?: () => void;
  onError?: () => void;
}

const setError = err => {
  return {
    type: SET_ERROR,
    payload: err,
  };
};

export default (props: CreateContactProps) => {
  return async (dispatch: any) => {
    return axios
      .post('https://contact.herokuapp.com/contact', props.data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: CREATE_CONTACT,
            payload: res.data,
          });
          if (props.onSuccess) {
            props.onSuccess();
          }
        }
      })
      .catch(err => {
        dispatch(setError(err));
        if (props.onError) {
          props.onError();
        }
      });
  };
};
