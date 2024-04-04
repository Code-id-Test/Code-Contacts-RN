import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '.';

export default () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageIcon}
        source={require('../assets/images/logo1.png')}
      />
      <Text style={styles.text}>Fetching contacts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    width: 120,
    height: 120,
  },
  text: {
    fontWeight: '300',
  },
});
