import React, { useMemo, useRef, useState } from 'react';
import {
  Image,
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
import { Button, Spacer } from '../components';
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
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.flex}>
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
        label="Save"
        style={{ marginBottom: insets.bottom }}
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
