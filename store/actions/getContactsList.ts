import axios from 'axios';
import { GET_CONTACTS_LIST, SET_ERROR } from '../constants';

interface GetContactsListProps {
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
      .get('https://contact.herokuapp.com/contact', {
        headers: { Accept: 'application/json' },
      })
      .then(res => {
        if (res.status === 200) {
          // const data: ContactsListProps_Data[] = res.data.data
          //   .slice(0, 1)
          //   .map((item: ContactsListProps_Data) => {
          //     if (item.photo) {
          //       const photo = item.photo?.includes('base64')
          //         ? Base64.decode(item.photo.split(',')[1])
          //         : item.photo;
          //       return { ...item, photo };
          //     }
          //   });
          dispatch({
            type: GET_CONTACTS_LIST,
            payload: res.data.data,
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
