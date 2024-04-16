import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface FloatingAddButtonProps {
  onPress: () => void;
}

export default (props: FloatingAddButtonProps) => {
  return (
    <Pressable style={styles.pressable} onPress={props.onPress}>
      <Icon name="plus" color="#000" size={20} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    position: 'absolute',
    zIndex: 2,
    right: 16,
    bottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: 'pink',
  },
});
