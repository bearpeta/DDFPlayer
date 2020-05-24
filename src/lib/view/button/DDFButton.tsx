import React from 'react';
import {TouchableOpacity, ViewStyle, TextStyle, StyleSheet} from 'react-native';
import DDFText from '../DDFText';

type buttonProps = {
  onPress: () => void;
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const DDFButton = (props: buttonProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style || {}]}
      onPress={props.onPress}>
      <DDFText style={[styles.text, props.textStyle]}>{props.text}</DDFText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {},
});
export default DDFButton;
