import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import TrackPlayManager, {
  usePlayerProgress,
} from 'lib/trackplaymanager/TrackPlayManager';
import {getTouchPanResponder} from './panResponder';
import ProgressTime from './ProgressTime';
import ProgressBar from './ProgressBar';
import {calcProgressViewLength, calcSecondsByPosition} from './calculations';

type progressProps = {
  playingTitle: string;
};

const PlayerProgress = (props: progressProps) => {
  const {position, duration} = usePlayerProgress();
  const [durationBarLength, setDurationBarLength] = useState(0);
  const [progressBarLength, setProgressBarLength] = useState(0);
  const [userInteraction, setUserInteraction] = useState(false); // is true when panResponder interaction is ongoing

  useEffect(() => {
    currentSecond.current = position;
    const newLength = calcProgressViewLength(
      durationBarLength,
      duration,
      position,
    );
    setProgressBarLength(newLength);
  }, [position, durationBarLength, duration]);

  // is used to save the current position in seconds while the user is interacting with progress bar.
  const currentSecond = useRef(position);

  const setPosInSec = useCallback(
    (releasedXPosition) => {
      currentSecond.current = calcSecondsByPosition(
        releasedXPosition,
        durationBarLength,
        duration,
      );
    },
    [durationBarLength, duration],
  );

  const touchDurationBarResponder = useCallback(() => {
    return getTouchPanResponder({
      onGrant: (releasedPosition: number) => {
        TrackPlayManager.pause();
        setUserInteraction(true);
        setPosInSec(releasedPosition);
        setProgressBarLength(Math.round(releasedPosition));
      },
      onMove: (releasedPosition: number) => {
        if (releasedPosition > durationBarLength + 20) {
          releasedPosition = durationBarLength;
        }
        setPosInSec(releasedPosition);
        setProgressBarLength(Math.round(releasedPosition));
      },
      onRelease: () => {
        setUserInteraction(false);
        // Since the forward-function expects the amount of seconds it should jump forward not the exact position it should jump to we have to .
        TrackPlayManager.forward(currentSecond.current - position)
          .then(() => TrackPlayManager.resume())
          .catch((e) =>
            console.log(`PlayerProgress: onRelease: forward failed: ${e}`),
          );
      },
      onTerminate: () => {
        setUserInteraction(false);
        TrackPlayManager.resume();
      },
    });
  }, [durationBarLength, position, setPosInSec])();

  return (
    <View style={styles.container}>
      <View
        style={styles.progressBarContainer}
        {...touchDurationBarResponder.panHandlers}>
        <ProgressBar
          onLayout={(event) => {
            setDurationBarLength(event.nativeEvent.layout.width);
          }}
          progress={progressBarLength}
          inInteraction={userInteraction}
        />
      </View>
      <View style={styles.timeContainer}>
        <ProgressTime
          currentSecond={currentSecond.current}
          duration={duration}
          title={props.playingTitle}
        />
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
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    //borderWidth: 1,
    //  borderColor: 'red',
  },
  progressBarContainer: {
    // borderWidth: 1,
    // borderColor: 'white',
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  timeContainer: {
    width: '100%',
    height: '30%',
  },
});

export default PlayerProgress;
