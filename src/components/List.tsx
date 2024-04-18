import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Spacer, Text } from '.';
import FastImage from 'react-native-fast-image';

interface LocationListProps {
  leftImage: string;
  label: string;
  onPress: () => void;
}

export default (props: LocationListProps) => {
  return (
    <Pressable
      android_ripple={{ color: '#FFC0CBAA' }}
      style={styles.container}
      onPress={props.onPress}>
      <View style={styles.imageAndLabel}>
        <FastImage
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={require('../assets/images/avatar.png')}
          source={{
            uri: props.leftImage.replace('http://', 'https://'),
            priority: FastImage.priority.normal,
          }}
        />
        <Spacer width={12} />
        <Text style={styles.text}>{props.label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  imageAndLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 30,
  },
  text: {
    textAlign: 'left',
  },
});
