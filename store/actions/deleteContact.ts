import axios from 'axios';
import { DELETE_CONTACT, SET_ERROR } from '../constants';

interface DeleteContactProps {
  contactId: string;
  onSuccess?: () => void;
  onError?: () => void;
}

const setError = err => {
  return {
    type: SET_ERROR,
    payload: err,
  };
};

export default (props: DeleteContactProps) => {
  return async dispatch => {
    return axios
      .delete(`https://contact.herokuapp.com/contact/${props.contactId}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_CONTACT,
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
