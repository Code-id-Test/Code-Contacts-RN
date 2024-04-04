import React from 'react';
import {
  Text,
  TextProps as RNTextProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export default (props: RNTextProps) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.text,
        ...(props.style as ViewStyle),
      }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});
