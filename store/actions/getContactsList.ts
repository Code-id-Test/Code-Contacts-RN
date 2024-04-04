import axios from 'axios';
import { GET_CONTACTS_LIST, SET_ERROR } from '../constants';
import { Base64 } from 'js-base64';
import { ContactsListProps_Data } from '../../src/types/dataTypes';

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

// export default (props: GetContactsListProps) => {
// return async dispatch => {
//   try {
//     const res = await fetch('https://contact.herokuapp.com/contact');
//     const payload = await res.json();
//     if (!res.ok) {
//       throw new Error(payload.message);
//     }
//     dispatch({
//       type: GET_CONTACTS_LIST,
//       payload,
//     });
//     if (props.onSuccess) {
//       props.onSuccess();
//     }
//   } catch (err) {
//     dispatch(setError(err));
//     if (props.onError) {
//       props.onError();
//     }
//   }
// };
// };

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
