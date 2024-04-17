import axios from 'axios';
import { UPDATE_CONTACT, UPDATE_CONTACT_ERROR } from '../constants';
import { ContactProps_Data } from '../../src/types/dataTypes';

interface UpdateContactProps {
  contactId: string;
  data: Partial<ContactProps_Data>;
  onSuccess?: () => void;
  onError?: () => void;
}

const setError = err => {
  return {
    type: UPDATE_CONTACT_ERROR,
    payload: err,
  };
};

export default (props: UpdateContactProps) => {
  return async (dispatch: any) =>
    axios
      .put(
        `https://contact.herokuapp.com/contact/${props.contactId}`,
        props.data,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: UPDATE_CONTACT,
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
