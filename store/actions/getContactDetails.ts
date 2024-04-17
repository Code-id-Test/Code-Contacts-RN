import axios from 'axios';
import { GET_CONTACT_DETAILS, GET_CONTACT_DETAILS_ERROR } from '../constants';

interface GetContactDetailsProps {
  contactId: string;
  onSuccess?: () => void;
  onError?: () => void;
}

const setError = (err: any) => {
  return {
    type: GET_CONTACT_DETAILS_ERROR,
    payload: err,
  };
};

export default (props: GetContactDetailsProps) => {
  return async (dispatch: any) =>
    axios
      .get(`https://contact.herokuapp.com/contact/${props.contactId}`, {
        headers: { Accept: 'application/json' },
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: GET_CONTACT_DETAILS,
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
