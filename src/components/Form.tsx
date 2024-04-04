import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface FormProps {
  pressable: boolean;
  input?: string;
  placeholder?: string;
  onPress?: () => void;
  onChangeText?: (val: string) => void;
  pressableStyle?: ViewStyle;
}

export default (props: FormProps) => {
  const textInputRef = useRef<TextInput>();
  const [input, setInput] = useState(props.input);

  return (
    <View style={styles.container}>
      {props.pressable ? (
        <Pressable
          style={{
            ...styles.pressable,
            ...(props.pressableStyle as ViewStyle),
          }}
          onPress={() => {
            if (props.onPress) {
              props.onPress();
            }
          }}>
          <View style={styles.row}>
            <Icon name="search" size={20} style={styles.icon} />
            <TextInput editable={false} style={styles.input} value={input} />
          </View>
        </Pressable>
      ) : (
        <View style={styles.textInputContainer}>
          <View style={styles.margin}>
            <Icon
              name="search"
              size={20}
              style={styles.icon}
              onPress={() => {
                textInputRef.current?.focus();
              }}
            />
            <TextInput
              ref={textInputRef}
              style={styles.input}
              placeholder={props.placeholder}
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
            <Icon
              name="close"
              size={20}
              style={styles.icon}
              onPress={() => {
                textInputRef.current?.clear();
                textInputRef.current?.focus();
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 6,
  },
  pressableTextInputContainer: {
    backgroundColor: '#fff',
  },
  pressable: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 46,
    justifyContent: 'center',
  },
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
  icon: {
    width: 32,
    height: 40,
    paddingVertical: 8,
    paddingLeft: 8,
    color: '#000',
    backgroundColor: 'transparent',
  },
  margin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: -20,
  },
});
