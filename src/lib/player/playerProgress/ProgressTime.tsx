import React, {useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import beautifyTime from 'lib/helpers/beautifyTime';
import DDFText from 'lib/view/DDFText';
import colors from 'res/colors';

type timeProps = {
  currentSecond: number;
  duration: number;
  title: string;
  style?: {};
};
const ProgressTime = (props: timeProps): JSX.Element => {
  const [marqueeLength, setMarqueeLength] = useState(0);
  const [marqueeWrapLength, setMarqueeWrapLength] = useState(0); // length of marquee container

  // Since I cannot style the "TextTicker" element probably I have to find out by myself if the text is to big for the given space.  Therefore I compare the width of the marquee and its parents.
  const textTooBig: boolean = useMemo(() => {
    if (marqueeWrapLength === 0) return false;
    return marqueeLength >= marqueeWrapLength;
  }, [marqueeLength, marqueeWrapLength]);

  const duration = useMemo(() => beautifyTime(props.duration), [
    props.duration,
  ]);
  return (
    <View style={[styles.infoContainer, props.style]}>
      <DDFText style={[styles.infoText, styles.currentPositionInfo]}>
        {beautifyTime(props.currentSecond)}
      </DDFText>
      <View
        style={styles.marqueeContainer}
        onLayout={(e) => {
          setMarqueeWrapLength(e.nativeEvent.layout.width);
        }}>
        <TextTicker
          onLayout={(e) => {
            setMarqueeLength(e.nativeEvent.layout.width);
          }}
          duration={textTooBig ? 15000 : 0}
          style={styles.title}
          loop={textTooBig}
          bounce={false}
          scroll={false}
          repeatSpacer={50}
          useNativeDriver={true}
          shouldAnimateTreshold={textTooBig ? marqueeWrapLength : 0}
          marqueeDelay={1000}>
          {props.title}
        </TextTicker>
      </View>

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
  currentPositionInfo: {
    textAlign: 'left',
  },
  infoText: {
    color: colors.primaryLightest,
    fontSize: 12,
    height: '100%',
    minWidth: '20%',
  },
  marqueeContainer: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 11,
    flex: 1,
    color: colors.primaryLightest,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  durationInfo: {
    textAlign: 'right',
  },
});
export default ProgressTime;
