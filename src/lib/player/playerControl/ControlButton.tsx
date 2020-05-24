import React from 'react';
import {TouchableNativeFeedback, StyleSheet} from 'react-native';

type buttonProps = {
  style?: {};
  image: JSX.Element;
  onPress: () => void;
};

const ControlButton = (props: buttonProps) => {
  return (
    <TouchableNativeFeedback
      style={[styles.button, props.style]}
      onPress={props.onPress}>
      {props.image}
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {},
});

export default ControlButton;
