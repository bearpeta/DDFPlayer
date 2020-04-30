import React, {useState, useEffect, useRef} from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';
import TrackPlayManager, {
  usePlayerProgress,
} from 'lib/trackplaymanager/TrackPlayManager';
import colors from 'res/colors';
import beautifyTime from './beautifyTime';
import {getTouchPanResponder} from './panResponder';

const calcProgressViewLength = (wholeLength, duration, position) => {
  if (wholeLength === 0 || duration === 0 || position === 0) {
    return 0;
  }
  const progressLength = (wholeLength / duration) * position;
  return parseInt(progressLength, 10);
};

const calcSecondsByPosition = (releasedXPosition, wholeLength, duration) => {
  return (releasedXPosition / wholeLength) * duration;
};

const PlayerProgress = ({}) => {
  const {position, bufferedPosition, duration} = usePlayerProgress();
  const [displayedLength, setDisplayedLength] = useState(0);
  const [progressLength, setProgressLength] = useState(0);

  useEffect(() => {
    currentSecond.current = position;
    const newLength = calcProgressViewLength(
      displayedLength,
      duration,
      position,
    );
    setProgressLength(newLength);
  }, [position, displayedLength, duration]);

  // This variable stores the current position of the progress bar while the user interacts with it so in case they terminate the action we can go back to the original position.
  const tempProgressLength = useRef(0);
  // is used to save the current position in seconds while the user is interacting with progress bar.
  const currentSecond = useRef(position);
  const animatedValue = useRef(new Animated.Value(1)).current;

  const scaleStyle = {
    transform: [{scale: animatedValue}],
  };

  const animate = toValue => {
    Animated.spring(animatedValue, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  const touchDurationBarResponder = getTouchPanResponder({
    onGrant: releasedPosition => {
      TrackPlayManager.pause();
      animate(1.5);
      setPosInSec(releasedPosition);

      // We have to save the current progressLength before the user starts any further interaction so we can jump back in case of a termination
      tempProgressLength.current = progressLength;
      setProgressLength(Math.round(releasedPosition));
    },
    onMove: releasedPosition => {
      setPosInSec(releasedPosition);
      if (releasedPosition > displayedLength + 20) {
        console.log(
          `Released position: ${releasedPosition}; Whole length: ${displayedLength +
            20}`,
        );
        releasedPosition = displayedLength;
      }
      setProgressLength(Math.round(releasedPosition));
    },
    onRelease: () => {
      animate(1);
      tempProgressLength.current = 0;

      // Since the forward-function expects the amount of seconds it should jump forward not the exact position it should jump to we have to .
      TrackPlayManager.forward(currentSecond.current - position)
        .then(() => TrackPlayManager.resume())
        .catch(e =>
          console.log(`PlayerProgress: onRelease: forward failed: ${e}`),
        );
    },
    onTerminate: () => {
      animate(1);
      setDisplayedLength(tempProgressLength.current);
      tempProgressLength.current = 0;
      TrackPlayManager.resume();
    },
  });

  const setPosInSec = releasedXPosition => {
    currentSecond.current = calcSecondsByPosition(
      releasedXPosition,
      displayedLength,
      duration,
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.barContainer}
        {...touchDurationBarResponder.panHandlers}>
        <View
          onLayout={event => {
            setDisplayedLength(event.nativeEvent.layout.width);
          }}
          style={styles.durationLine}>
          <View
            style={{
              ...styles.progressLine,
              width: progressLength,
            }}>
            <Animated.View style={[styles.currentPosBtn, scaleStyle]} />
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.infoText]}>
          {beautifyTime(currentSecond.current)}
        </Text>

        <Text style={[styles.infoText, styles.durationInfo]}>
          {beautifyTime(duration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    //paddingTop: 2,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  barContainer: {
    width: '100%',
    height: '50%',
    paddingTop: 7,
    paddingBottom: 8,
    //borderWidth: 1,
    //borderColor: 'red',
    justifyContent: 'center',
    alignContent: 'center',
  },
  durationLine: {
    width: '100%',
    height: 2,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  progressLine: {
    width: 0,
    height: 2,
    marginLeft: -1,
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  currentPosBtn: {
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 20 / 2,
    //alignSelf: 'flex-end',
    marginRight: -5,
  },
  infoContainer: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
  },
  durationInfo: {},
});

export default PlayerProgress;
