import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Asset,
  MediaType,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Button, Loading, Modal, Spacer, Text } from '../components';
import { getContactDetails, updateContact } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

interface ContactDetailsProps {
  input: {
    photo: string;
    firstName: string;
    lastName: string;
    age: number;
  };
  placeholder: string;
  route: any;
  navigation: any;
  onChangeText?: (props: {
    photo: string;
    firstName: string;
    lastName: string;
    age: number;
  }) => void;
}

export default (props: Partial<ContactDetailsProps>) => {
  const options = {
    mediaType: 'photo' as MediaType,
    includeBase64: true,
    maxHeight: 2000,
    maxWidth: 2000,
  };
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const lastNameRef = useRef<TextInput>(null);
  const ageRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);
  const [calls, setCalls] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [showURLModal, setShowURLModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const { data: contactDetailsQuery } = useSelector(
    (state: any) => state.contactDetails,
  );
  const { data: updateContactData, error: updateContactError } = useSelector(
    (state: any) => state.updateContact,
  );
  const [input, setInput] = useState({
    photo: '',
    firstName: '',
    lastName: '',
    age: 0,
  });

  const ageValue = useMemo(() => {
    if (input?.age === 0 || input?.age?.toString() === 'NaN') {
      return '';
    }
    return input?.age?.toString();
  }, [input?.age]);

  const submitDisabled = useMemo(() => {
    if (!input?.photo || !input?.firstName || !input.lastName || !input?.age) {
      return true;
    }
    return false;
  }, [input]);

  const queryContactDetailsHandler = (contactId: string) => {
    setLoading(true);

    if (!calls) {
      setCalls(true);
      dispatch(
        getContactDetails({
          contactId,
          onSuccess: () => setLoading(false),
          onError: () => setLoading(false),
        }),
      );
    }
  };

  const openImagePicker = () => {
    return launchImageLibrary(options, res => {
      if (res.errorCode) {
        return null;
      }
      let imageUri = (res as Asset).uri ?? res.assets?.[0]?.uri ?? '';
      setSelectedImage(imageUri.replace('http://', 'https://'));
      setInput({
        ...input,
        photo: imageUri,
      });
    });
  };

  const onSave = () => {
    dispatch(
      updateContact({
        contactId: props.route.params?.id,
        data: input,
        onSuccess: () => {
          setLoading(false);
        },
        onError: () => setLoading(false),
      }),
    );
    setShowSuccessModal(true);
  };

  useEffect(() => {
    if (updateContactData.length > 1) {
      props.navigation.goBack();
    }
    if (updateContactError) {
      setShowErrorModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateContactData, updateContactError]);

  useEffect(() => {
    if (!calls) {
      queryContactDetailsHandler(props.route.params?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calls, props.route.params]);

  useEffect(() => {
    setInput({
      firstName: contactDetailsQuery?.data?.firstName,
      lastName: contactDetailsQuery?.data?.lastName,
      age: contactDetailsQuery?.data?.age,
      photo: contactDetailsQuery?.data?.photo,
    });
    setSelectedImage(
      contactDetailsQuery?.data?.photo.replace('http://', 'https://'),
    );
  }, [contactDetailsQuery?.data]);

  return (
    <View style={styles.container}>
      <Modal
        useActionButtons={false}
        visible={showPickerModal}
        title="Pick an Image"
        onClose={() => {
          setShowPickerModal(false);
        }}>
        <Pressable
          android_ripple={{ color: '#FFC0CBAA' }}
          onPress={() => {
            setShowPickerModal(false);
            setShowURLModal(true);
          }}
          style={styles.modalPressable}>
          <Text>Pick from URL ...</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: '#FFC0CBAA' }}
          onPress={() => {
            setShowPickerModal(false);
            openImagePicker();
          }}
          style={styles.modalPressable}>
          <Text>Pick an Image ...</Text>
        </Pressable>
      </Modal>
      <Modal
        useActionButtons
        visible={showURLModal}
        title="Pick an Image"
        onClose={() => {
          setShowURLModal(false);
        }}
        onAccept={() => {
          setSelectedImage(input?.photo.replace('http://', 'https://'));
          setShowURLModal(false);
        }}>
        <View style={styles.modalPressable}>
          <TextInput
            style={styles.input}
            placeholder="Type in image URL ..."
            placeholderTextColor="#666"
            value={input?.photo}
            returnKeyType="next"
            onChangeText={v => {
              setInput({
                ...input,
                photo: v,
              });
              if (props.onChangeText) {
                props.onChangeText({
                  ...input,
                  photo: v,
                });
              }
            }}
            onSubmitEditing={() => {
              setShowURLModal(false);
            }}
          />
        </View>
      </Modal>
      <Modal
        useActionButtons
        visible={showSuccessModal}
        title="Successfully Updated"
        onClose={() => {
          setShowSuccessModal(false);
        }}
        onAccept={() => {
          setShowSuccessModal(false);
        }}>
        Contact updated successfully
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.flex}>
              <View style={styles.imagePickerContainer}>
                <FastImage
                  defaultSource={require('../assets/images/avatar.png')}
                  source={{ uri: selectedImage }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={styles.avatar}
                />
              </View>
              <Spacer height={20} />
              <Button
                label="Pick an Image"
                style={styles.imagePickerButton}
                textStyle={styles.imagePickerButtonText}
                onPress={() => {
                  setShowPickerModal(true);
                }}
              />

              <Spacer height={24} />

              <View style={styles.row}>
                <Icon name="user" size={20} color="#000" style={styles.icon} />
                <Spacer width={12} />
                <TextInput
                  style={styles.input}
                  placeholder="First name"
                  placeholderTextColor="#666"
                  value={input?.firstName}
                  returnKeyType="next"
                  onChangeText={v => {
                    setInput({
                      ...input,
                      firstName: v,
                    });
                    if (props.onChangeText) {
                      props.onChangeText({
                        ...input,
                        firstName: v,
                      });
                    }
                  }}
                  onSubmitEditing={() => {
                    lastNameRef.current?.focus();
                  }}
                />
              </View>

              <Spacer height={12} />

              <View style={styles.row}>
                <Spacer width={26} />
                <TextInput
                  ref={lastNameRef}
                  style={styles.input}
                  placeholder="Last name"
                  placeholderTextColor="#666"
                  value={input?.lastName}
                  returnKeyType="next"
                  onChangeText={v => {
                    setInput({
                      ...input,
                      lastName: v,
                    });
                    if (props.onChangeText) {
                      props.onChangeText({
                        ...input,
                        lastName: v,
                      });
                    }
                  }}
                  onSubmitEditing={() => {
                    ageRef.current?.focus();
                  }}
                />
              </View>

              <Spacer height={12} />

              <View style={styles.row}>
                <Icon
                  name="pagelines"
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
                <Spacer width={12} />
                <TextInput
                  ref={ageRef}
                  style={styles.input}
                  placeholder="Age"
                  placeholderTextColor="#666"
                  value={ageValue}
                  // keyboardType="numeric"
                  returnKeyType="next"
                  onChangeText={v => {
                    setInput({
                      ...input,
                      age: Number(v),
                    });
                    if (props.onChangeText) {
                      props.onChangeText({
                        ...input,
                        age: Number(v),
                      });
                    }
                  }}
                  onSubmitEditing={() => {
                    ageRef.current?.blur();
                  }}
                />
              </View>
            </View>
          </ScrollView>
          <Button
            disabled={submitDisabled}
            label="Save"
            style={{
              ...styles.submitButton,
              width: Dimensions.get('window').width - 32,
              marginBottom: insets.bottom + 16,
            }}
            onPress={onSave}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginTop: -10,
  },
  imagePickerContainer: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  avatar: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imagePickerButton: {
    alignSelf: 'center',
    width: 110,
    height: 36,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  imagePickerButtonText: {
    fontSize: 12,
  },
  submitButton: {
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#999',
    backgroundColor: 'transparent',
    color: '#363636',
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  modalPressable: {
    width: '100%',
    padding: 12,
  },
});
