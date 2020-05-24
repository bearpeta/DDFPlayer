import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import DDFText from 'lib/view/DDFText';
import colors from 'res/colors';

type pickerProps = {
  style?: ViewStyle;
  onChange: (oldValue: number, newValue: number) => void;
  setNumber?: number;
};

const TimeNumberPicker = (props: pickerProps): JSX.Element => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (props.setNumber !== undefined && props.setNumber !== count) {
      setCount(props.setNumber);
    }
  }, [props.setNumber, count]);

  const setNewCount = (newCount: number) => {
    if (newCount >= 60) {
      newCount = 0;
    } else if (newCount < 0) {
      newCount = 59;
    }
    const oldCount = count;
    setCount(newCount);
    props.onChange(oldCount, newCount);
  };

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={styles.buttonUp}
        onPress={() => setNewCount(count + 1)}>
        <DDFText>up</DDFText>
      </TouchableOpacity>
      <TextInput
        onChangeText={(text) => {
          const num = parseInt(text, 10);
          if (isNaN(num)) return;
          setNewCount(num);
        }}
        style={styles.input}
        defaultValue={count.toString()}
        keyboardType={'number-pad'}
      />
      <TouchableOpacity
        style={styles.buttonDown}
        onPress={() => setNewCount(count - 1)}>
        <DDFText>down</DDFText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {borderWidth: 0, borderColor: 'red', elevation: 5},
  input: {
    height: '30%',
    width: '100%',
    backgroundColor: colors.almostWhite,
    color: colors.primaryDark,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
  buttonUp: {
    height: '35%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  buttonDown: {
    height: '35%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
});

export default TimeNumberPicker;
