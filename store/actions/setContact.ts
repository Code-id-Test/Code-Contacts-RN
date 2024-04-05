import axios from 'axios';
import { SET_CONTACT, SET_ERROR } from '../constants';
import { ContactsListProps_Data } from '../../src/types/dataTypes';

interface GetContactsListProps {
  data: Partial<ContactsListProps_Data>;
  onSuccess?: () => void;
  onError?: () => void;
}

const setError = err => {
  return {
    type: SET_ERROR,
    payload: err,
  };
};

export default (props: GetContactsListProps) => {
  return async dispatch => {
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
            type: SET_CONTACT,
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
