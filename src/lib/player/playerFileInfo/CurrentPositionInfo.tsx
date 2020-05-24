import React, {useMemo} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import beautifyTime from 'lib/helpers/beautifyTime';
import colors from 'res/colors';
import DDFText from 'lib/view/DDFText';

type infoProps = {
  pos: number;
  labelText: string;
  onPress: () => void;
};
const CurrentPositionInfo = (props: infoProps): JSX.Element => {
  const currentTime: string = useMemo(() => beautifyTime(props.pos), [
    props.pos,
  ]);

  if (props.pos < 1) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <DDFText style={styles.labelText}>{`${props.labelText}: `}</DDFText>
        <DDFText style={styles.timeText}>{currentTime}</DDFText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
          <DDFText style={styles.buttonText}>Jump to</DDFText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    //borderWidth: 2,
    //borderColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
  },
  textContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    alignItems: 'center',
  },
  labelText: {},
  timeText: {
    fontWeight: 'bold',
    lineHeight: 20,
  },
  buttonContainer: {
    width: '30%',
    paddingHorizontal: 10,
  },
  button: {
    height: 40,
    borderWidth: 2,
    borderColor: colors.blue,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.blue,
  },
});

export default CurrentPositionInfo;
