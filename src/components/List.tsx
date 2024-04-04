import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Spacer, Text } from '.';

interface LocationListProps {
  leftImage: string;
  label: string;
  rightLabel: string;
  rightLabelIcon: ImageSourcePropType | null;
  onPress: () => void;
}

export default (props: LocationListProps) => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <View style={styles.iconAndLabel}>
        <Image
          source={{ uri: props.leftImage }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 30,
          }}
        />
        <Spacer width={4} />
        <Text style={styles.text}> {props.label}</Text>
      </View>
      <View style={styles.weather}>
        <Text>{props.rightLabel}</Text>
        <Spacer width={8} />
        {props.rightLabelIcon ? (
          <Image style={styles.weatherIcon} source={props.rightLabelIcon} />
        ) : null}
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
  iconAndLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    color: '#000',
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'left',
  },
  weather: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 30,
    height: 30,
  },
});
