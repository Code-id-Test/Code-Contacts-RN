import React, { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  Asset,
  MediaType,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Button, Modal, Spacer, Text } from '../components';
import { setContact } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NewContactProps {
  input: {
    photo: string;
    firstName: string;
    lastName: string;
    age: number;
  };
  placeholder: string;
  onChangeText?: (props: {
    photo: string;
    firstName: string;
    lastName: string;
    age: number;
  }) => void;
}

export default (props: NewContactProps) => {
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
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [showURLModal, setShowURLModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [input, setInput] = useState(
    props.input ?? {
      photo: '',
      firstName: '',
      lastName: '',
      age: 0,
    },
  );

  const ageValue = useMemo(() => {
    if (input?.age === 0 || input?.age.toString() === 'NaN') {
      return '';
    }
    return input?.age.toString();
  }, [input?.age]);

  const submitDisabled = useMemo(() => {
    if (!input?.photo || !input?.firstName || !input.lastName || !input?.age) {
      return true;
    }
    return false;
  }, [input]);

  const openImagePicker = () => {
    return launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorCode) {
        console.log('Image picker error: ', res.errorMessage);
      } else {
        let imageUri = (res as Asset).uri ?? res.assets?.[0]?.uri ?? '';
        setSelectedImage(imageUri);
        setInput({
          ...input,
          photo: imageUri,
        });
      }
    });
  };

  const onSubmit = () => {
    dispatch(
      setContact({
        data: input,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Modal
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
          setSelectedImage(input?.photo);
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
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.flex}>
          <View style={styles.imagePickerContainer}>
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage }
                  : require('../assets/images/avatar.png')
              }
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <Spacer height={20} />
          <Button
            label="Pick an Image"
            style={styles.imagePickerButton}
            textStyle={{ fontSize: 12 }}
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
            <Icon name="pagelines" size={20} color="#000" style={styles.icon} />
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
        onPress={onSubmit}
      />
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
