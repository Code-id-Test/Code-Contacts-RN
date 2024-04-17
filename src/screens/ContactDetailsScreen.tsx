import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getContactDetails, deleteContact } from '../../store/actions';
import { Button, Loading, Modal, Text } from '../components';

export default ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const [calls, setCalls] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data: contactDetailsQuery } = useSelector(
    (state: any) => state.contactDetails,
  );

  const queryContactsHandler = () => {
    setLoading(true);

    if (!calls && route.params?.id) {
      dispatch(
        getContactDetails({
          contactId: route.params.id,
          onSuccess: () => setLoading(false),
          onError: () => setLoading(false),
        }),
      );
    }
  };

  const onDeleteContact = useCallback(() => {
    if (route.params?.id) {
      dispatch(
        deleteContact({
          contactId: route.params.id,
          onSuccess: () => setLoading(false),
          onError: () => setLoading(false),
        }),
      );
    }
  }, [dispatch, route.params?.id]);

  useEffect(() => {
    setCalls(false);
  }, [isFocused]);

  useEffect(() => {
    if (contactDetailsQuery && !calls) {
      setCalls(true);
    }
  }, [contactDetailsQuery, calls]);

  useEffect(() => {
    if (!calls) {
      queryContactsHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calls]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Modal
              visible={showModal}
              title="Are You Sure"
              onClose={() => {
                setShowModal(false);
              }}
              onAccept={() => {
                onDeleteContact();
                setShowModal(false);
                navigation.goBack();
              }}>
              Do you want to delete this contact?
            </Modal>
            <Text>{contactDetailsQuery.data?.photo}</Text>
            <Text>{contactDetailsQuery.data?.firstName}</Text>
            <Text>{contactDetailsQuery.data?.lastName}</Text>
            <Text>{contactDetailsQuery.data?.age}</Text>
            <Button
              label="Delete"
              style={{
                alignSelf: 'center',
                width: 110,
                height: 36,
                paddingVertical: 0,
                paddingHorizontal: 0,
              }}
              textStyle={{ fontSize: 12 }}
              onPress={() => {
                setShowModal(true);
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  border: {
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  buttonNavigateToSearch: {
    position: 'absolute',
    backgroundColor: 'red',
    flex: 1,
    width: '100%',
    height: 46,
    justifyContent: 'center',
  },
});
