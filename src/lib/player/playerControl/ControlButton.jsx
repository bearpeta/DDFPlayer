import React from 'react';
import {TouchableNativeFeedback, StyleSheet} from 'react-native';

const ControlButton = ({style, image, onPress = () => {}}) => {
  return (
    <TouchableNativeFeedback style={[styles.button, styles]} onPress={onPress}>
      {image}
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {},
});

export default ControlButton;
