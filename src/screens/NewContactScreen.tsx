import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  Asset,
  MediaType,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Button, Spacer } from '../components';
import { setContact } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const lastNameRef = useRef<TextInput>(null);
  const ageRef = useRef<TextInput>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [input, setInput] = useState(
    props.input ?? {
      photo: '',
      firstName: '',
      lastName: '',
      age: 0,
    },
  );

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

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        padding: 16,
      }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignSelf: 'center',
            width: 100,
            height: 100,
          }}>
          <Image
            source={
              selectedImage
                ? { uri: selectedImage }
                : require('../assets/images/avatar.png')
            }
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              borderRadius: 50,
            }}
            resizeMode="cover"
          />
        </View>
        <Spacer height={20} />
        <Button
          label="Pick an Image"
          style={{
            alignSelf: 'center',
            width: 110,
            height: 36,
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
          textStyle={{ fontSize: 12 }}
          onPress={openImagePicker}
        />

        <Spacer height={24} />

        <View style={styles.row}>
          <Icon name="user" size={20} color="#000" />
          <Spacer width={8} />
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
          <Spacer width={16} />
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
          <Spacer width={16} />
          <TextInput
            ref={ageRef}
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#666"
            value={input?.age.toString()}
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

      <Button label="Save" onPress={onSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
