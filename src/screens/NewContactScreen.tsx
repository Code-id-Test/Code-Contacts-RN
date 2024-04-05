import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Spacer } from '../components';
import Icons from 'react-native-feather1s';

interface NewContactProps {
  input: {
    firstName: string;
    lastName: string;
    age: string;
  };
  placeholder: string;
  onChangeText?: (val: string) => void;
}

export default (props: NewContactProps) => {
  const [input, setInput] = useState(props.input);

  return (
    <ScrollView>
      <Image source={{ uri: require('../assets/images/avatar.png') }} />
      <Spacer height={24} />
      <View style={{ flexDirection: 'row' }}>
        <Icons name="person" size={20} />
        <TextInput
          style={styles.input}
          placeholder="First name"
          placeholderTextColor="#000"
          value={input}
          returnKeyType="search"
          onChangeText={v => {
            setInput(v);
            if (props.onChangeText) {
              props.onChangeText(v);
            }
          }}
        />
        <Spacer height={12} />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#000"
          value={input}
          returnKeyType="search"
          onChangeText={v => {
            setInput(v);
            if (props.onChangeText) {
              props.onChangeText(v);
            }
          }}
        />
        <Spacer height={20} />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#000"
          value={input}
          returnKeyType="search"
          onChangeText={v => {
            setInput(v);
            if (props.onChangeText) {
              props.onChangeText(v);
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    color: '#363636',
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    marginBottom: 10,
  },
});
