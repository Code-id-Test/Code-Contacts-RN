import React from 'react';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface FloatingAddButtonProps {
  onPress: () => void;
}

export default (props: FloatingAddButtonProps) => {
  return (
    <SafeAreaView>
      <Pressable style={styles.pressable} onPress={props.onPress}>
        <Icon name="plus" color="#5c2233" size={20} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pressable: {
    position: 'absolute',
    zIndex: 2,
    right: 20,
    bottom: 24,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: 'pink',
  },
});
