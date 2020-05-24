import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import beautifyTime from 'lib/helpers/beautifyTime';
import colors from 'res/colors';
import DDFText from 'lib/view/DDFText';

type timeProps = {
  currentSecond: number;
  duration: number;
  title: string;
  style?: {};
};
const ProgressTime = (props: timeProps): JSX.Element => {
  const duration = useMemo(() => beautifyTime(props.duration), [
    props.duration,
  ]);
  return (
    <View style={[styles.infoContainer, props.style]}>
      <DDFText style={[styles.infoText]}>
        {beautifyTime(props.currentSecond)}
      </DDFText>
      <DDFText style={[styles.infoText, styles.title]}>{props.title}</DDFText>
      <DDFText style={[styles.infoText, styles.durationInfo]}>
        {duration}
      </DDFText>
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
  title: {
    marginTop: -5,
    fontSize: 10,
  },
  durationInfo: {},
});
export default ProgressTime;
