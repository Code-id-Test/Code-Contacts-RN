import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface SnackbarProps {
  message: string;
  actionText: string;
  onActionPress: () => void;
  duration?: number;
  position?: string;
  backgroundColor?: string;
  textColor?: string;
  actionTextColor?: string;
  containerStyle?: ViewStyle;
  messageStyle?: ViewStyle;
  actionTextStyle?: ViewStyle;
}

export default ({
  duration = 3000,
  position = 'bottom',
  backgroundColor = '#2E67F8',
  textColor = 'white',
  actionTextColor = 'white',
  containerStyle = { marginHorizontal: 12 },
  ...props
}: SnackbarProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration]);

  return isVisible ? (
    <View
      style={[
        styles.container,
        position === 'top' ? styles.topContainer : styles.bottomContainer,
        containerStyle,
        { backgroundColor: backgroundColor },
      ]}>
      <Text
        style={[styles.messageText, props.messageStyle, { color: textColor }]}>
        {props.message}
      </Text>
      {props.actionText && (
        <TouchableOpacity onPress={props.onActionPress}>
          <Text
            style={[
              styles.actionText,
              props.actionTextStyle,
              { color: actionTextColor },
            ]}>
            {props.actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  topContainer: {
    top: 15,
  },
  bottomContainer: {
    bottom: 15,
  },
  messageText: {
    fontSize: 16,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
