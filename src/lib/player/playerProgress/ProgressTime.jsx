import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import beautifyTime from './beautifyTime';
import colors from 'res/colors';

const ProgressTime = ({currentSecond, duration, style = {}}) => {
  return (
    <View style={[styles.infoContainer, style]}>
      <Text style={[styles.infoText]}>{beautifyTime(currentSecond)}</Text>

      <Text style={[styles.infoText, styles.durationInfo]}>
        {beautifyTime(duration)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoText: {
    color: colors.primaryLightest,
    fontSize: 12,
  },
  durationInfo: {},
});
export default ProgressTime;
