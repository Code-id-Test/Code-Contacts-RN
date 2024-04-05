import React, { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Spacer, Text } from '.';

interface LocationListProps {
  leftImage: string;
  label: string;
  onPress: () => void;
}

export default (props: LocationListProps) => {
  const [imageIsValid, setImageIsValid] = useState(true);

  const parsedImage = useMemo(() => {
    if (!imageIsValid) {
      return require('../assets/images/avatar.png');
    }
    return { uri: props.leftImage };
  }, [props.leftImage, imageIsValid]);

  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <View style={styles.imageAndLabel}>
        <Image
          onError={() => setImageIsValid(false)}
          source={parsedImage}
          style={styles.image}
        />
        <Spacer width={4} />
        <Text style={styles.text}> {props.label}</Text>
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
