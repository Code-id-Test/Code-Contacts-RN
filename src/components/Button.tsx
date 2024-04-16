import React from 'react';
import { Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Text from './Text';

interface ButtonProps {
  onPress: () => void;
  transparent?: boolean;
  label?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default (props: ButtonProps) => {
  return (
    <Pressable
      style={{
        ...(props.transparent ? styles.buttonTransparent : styles.button),
        ...props.style,
      }}
      onPress={props.onPress}>
      {props.label ? (
        <Text style={{ ...styles.text, ...props.textStyle }}>
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
    elevation: 3,
    backgroundColor: '#FFC0CB',
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
    color: '#5c2233',
  },
});
