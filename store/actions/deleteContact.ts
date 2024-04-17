import axios from 'axios';
import { DELETE_CONTACT, DELETE_CONTACT_ERROR } from '../constants';

interface DeleteContactProps {
  contactId: string;
  onSuccess?: () => void;
  onError?: () => void;
}

const setError = err => {
  return {
    type: DELETE_CONTACT_ERROR,
    payload: err,
  };
};

export default (props: DeleteContactProps) => {
  return async (dispatch: any) =>
    await axios
      .delete(`https://contact.herokuapp.com/contact/${props.contactId}`)
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
