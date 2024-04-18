import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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
        <View style={styles.imageContainer}>
          <FastImage
            defaultSource={require('../assets/images/avatar.png')}
            source={{ uri: props.leftImage.replace('http://', 'https://') }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.image}
          />
        </View>
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
  imageContainer: {
    width: 36,
    height: 36,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  text: {
    textAlign: 'left',
  },
});
