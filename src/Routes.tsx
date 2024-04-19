import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContactDetailsScreen, HomeScreen, NewContactScreen } from './screens';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../store/actions';
import { useNavigation } from '@react-navigation/core';
import { Modal } from './components';

const Stack = createNativeStackNavigator();

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [params, setParams] = useState<any>();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { data: deleteContactData, error: deleteContactError } = useSelector(
    (state: any) => state.deleteContact,
  );

  useEffect(() => {
    if (deleteContactData) {
      navigation.goBack();
    }
    if (deleteContactError) {
      setShowErrorModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteContactData, deleteContactError]);

  return (
    <>
      <Modal
        useActionButtons
        visible={showConfirmationModal}
        title="Delete Contact"
        onClose={() => {
          setShowConfirmationModal(false);
        }}
        onAccept={() => {
          dispatch(
            deleteContact({
              contactId: params.id,
            }),
          );
          setShowConfirmationModal(false);
        }}>
        Are you sure to delete this contact?
      </Modal>
      <Modal
        useActionButtons
        hideCancelAction
        visible={showErrorModal}
        title="Error"
        onClose={() => {
          setShowErrorModal(false);
        }}
        onAccept={() => {
          setShowErrorModal(false);
        }}>
        Something wrong happened. Please try again
      </Modal>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="ContactDetails"
          component={ContactDetailsScreen}
          listeners={({ route }) => {
            setParams(route.params);
          }}
          options={{
            title: 'Contact Details',
            headerShown: true,
            headerBackButtonMenuEnabled: true,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
              <Pressable
                style={styles.pressable}
                onPress={() => setShowConfirmationModal(true)}>
                <Icon name="trash" size={20} color="#000" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="NewContact"
          component={NewContactScreen}
          options={{
            title: 'Create a Contact',
            headerShown: true,
            headerBackButtonMenuEnabled: true,
            // headerRight
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  pressable: {
    padding: 14,
    marginRight: -8,
  },
});
