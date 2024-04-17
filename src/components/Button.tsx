import React from 'react';
import {
  PressableProps,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Text from './Text';

interface ButtonProps extends PressableProps {
  onPress: () => void;
  shadow?: boolean;
  transparent?: boolean;
  label?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default (props: ButtonProps) => {
  return (
    <Pressable
      {...props}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: props.disabled ? '#DDD' : '#FFC0CB',
        elevation: props.shadow ? 2 : 0,
        ...(props.transparent ? styles.buttonTransparent : styles.button),
        ...props.style,
      }}
      onPress={props.onPress}>
      {props.label ? (
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            color: props.disabled ? '#888' : '#5C2233',
            ...styles.text,
            ...props.textStyle,
          }}>
          {props.label}
        </Text>
      ) : (
        props.children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  buttonTransparent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
