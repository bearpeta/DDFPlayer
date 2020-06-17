import React, {useEffect, useRef, useCallback} from 'react';
import {Animated, View, StyleSheet, LayoutChangeEvent} from 'react-native';
import DDFText from 'lib/view/DDFText';
import colors from 'res/colors';
import {elevationStyle} from 'res/styles';

type BarProps = {
  onLayout: (event: LayoutChangeEvent) => void;
  progress: number;
  inInteraction: boolean;
};
const ProgressBar = ({onLayout, progress, inInteraction}: BarProps) => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  const animate = useCallback(
    (toValue) => {
      Animated.spring(animatedValue, {
        toValue,
        useNativeDriver: true,
      }).start();
    },
    [animatedValue],
  );

  useEffect(() => {
    const toValue = inInteraction ? 1.5 : 1;
    animate(toValue);
  }, [inInteraction, animate]);

  return (
    <View onLayout={onLayout} style={styles.durationLine}>
      <View
        style={{
          ...styles.progressLine,
          width: progress,
        }}>
        <Animated.View
          style={[styles.currentPosBtn, {transform: [{scale: animatedValue}]}]}>
          <DDFText style={styles.buttonText}>???</DDFText>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  durationLine: {
    width: '100%',
    height: 2,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: colors.primaryLightest,
    borderWidth: 1,
    ...elevationStyle,
  },
  progressLine: {
    width: 0,
    height: 2,
    marginLeft: -1,
    borderWidth: 1,
    borderColor: colors.blue,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  currentPosBtn: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 20 / 2,
    //alignSelf: 'flex-end',
    marginRight: -5,
    ...elevationStyle,
  },
  buttonText: {color: colors.white, fontWeight: 'bold', fontSize: 10},
});
export default ProgressBar;
