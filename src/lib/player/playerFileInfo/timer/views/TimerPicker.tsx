import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import TimeNumberPicker from './TimeNumberPicker';
import DDFText from 'lib/view/DDFText';

type pickerProps = {
  style?: ViewStyle;
  onChange: (inSec: number) => void;
};
const TimerPicker = (props: pickerProps): JSX.Element => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const hoursInSec = hours * 3600;
    const minutesInSec = minutes * 60;
    props.onChange(hoursInSec + minutesInSec + seconds);
  }, [hours, minutes, seconds, props]);

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.unitContainer}>
        <TimeNumberPicker
          setNumber={hours}
          style={styles.picker}
          onChange={(_oldCount, newCount) => {
            setHours(newCount);
          }}
        />
        <DDFText style={styles.pickerDesc}>Hours</DDFText>
      </View>
      <View style={styles.unitContainer}>
        <TimeNumberPicker
          setNumber={minutes}
          style={styles.picker}
          onChange={(oldCount, newCount) => {
            let currentHour = hours;

            if (oldCount === 59 && newCount === 0) {
              currentHour++;
            } else if (oldCount === 0 && newCount === 59 && hours > 0) {
              currentHour--;
            }
            setHours(currentHour);
            setMinutes(newCount);
          }}
        />
        <DDFText style={styles.pickerDesc}>Min</DDFText>
      </View>
      <View style={styles.unitContainer}>
        <TimeNumberPicker
          setNumber={seconds}
          style={styles.picker}
          onChange={(oldCount, newCount) => {
            let currentHour = hours;
            let currentMinute = minutes;

            if (oldCount === 59 && newCount === 0) {
              currentMinute++;
            } else if (oldCount === 0 && newCount === 59) {
              currentMinute--;
            }

            if (currentMinute >= 60) {
              currentHour++;
              currentMinute = 0;
            } else if (currentMinute < 0) {
              if (currentHour > 0) {
                currentHour--;
                currentMinute = 59;
              } else {
                currentMinute = 0;
              }
            }

            setHours(currentHour);
            setMinutes(currentMinute);
            setSeconds(newCount);
          }}
        />
        <DDFText style={styles.pickerDesc}>Sec</DDFText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderWidth: 2,
    // borderColor: 'yellow',
  },
  unitContainer: {
    //width: 60,
    //height: 150,
    alignItems: 'center',
  },
  pickerDesc: {
    marginTop: 10,
  },
  picker: {width: 60, height: 120},
});

export default TimerPicker;
