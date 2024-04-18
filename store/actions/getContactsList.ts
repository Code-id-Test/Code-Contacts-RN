import axios from 'axios';
import { GET_CONTACTS_LIST, GET_CONTACTS_LIST_ERROR } from '../constants';
import { ContactProps_Data } from '../../src/types/dataTypes';

interface GetContactsListProps {
  onSuccess?: () => void;
  onError?: () => void;
}

const setError = (err: any) => {
  return {
    type: GET_CONTACTS_LIST_ERROR,
    payload: err,
  };
};

export default (props: GetContactsListProps) => {
  return async (dispatch: any) =>
    axios
      .get('https://contact.herokuapp.com/contact', {
        headers: { Accept: 'application/json' },
      })
      .then(res => {
        if (res.status === 200) {
          const resData = {
            message: res.data.message,
            data: JSON.parse(JSON.stringify(res.data.data).replace(/'/g, '"')),
          };
          dispatch({
            type: GET_CONTACTS_LIST,
            payload: resData,
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
