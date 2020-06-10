import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import TrackPlayManager, {
  usePlayerProgress,
} from 'lib/trackplaymanager/TrackPlayManager';
import {calcProgressViewLength, calcSecondsByPosition} from './calculations';
import {getTouchPanResponder} from './panResponder';
import ProgressBar from './ProgressBar';
import ProgressTime from './ProgressTime';

type progressProps = {
  playingTitle: string;
  lastSavedPosition: number;
  duration: number;
};

const PlayerProgress = (props: progressProps) => {
  // is used to save the current position in seconds while the user is interacting with progress bar.
  const currentSecond = useRef(0);
  const [pos, setPos] = useState(0);

  const {position} = usePlayerProgress();
  const [durationBarLength, setDurationBarLength] = useState(0);
  const [progressBarLength, setProgressBarLength] = useState(0);
  const [userInteraction, setUserInteraction] = useState(false); // is true when panResponder interaction is ongoing

  // This just get called every time the playing file changes.
  // We need lastSavedPosition particularly when the app starts up and it pre-loads the file from the last time using.
  useEffect(() => {
    setPos(props.lastSavedPosition);
  }, [props.lastSavedPosition]);

  // As long as the position value is 0 I don't want to use it and use props.lastSavedPosition instead.
  useEffect(() => {
    if (position < 1) {
      return;
    }
    setPos(position);
  }, [position]);

  useEffect(() => {
    currentSecond.current = pos;
    const newLength = calcProgressViewLength(
      durationBarLength,
      props.duration,
      pos,
    );
    setProgressBarLength(newLength);
  }, [pos, durationBarLength, props.duration]);

  const setPosInSec = useCallback(
    (releasedXPosition) => {
      currentSecond.current = calcSecondsByPosition(
        releasedXPosition,
        durationBarLength,
        props.duration,
      );
    },
    [durationBarLength, props.duration],
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
        TrackPlayManager.forward(currentSecond.current - pos).then(() =>
          TrackPlayManager.resume(),
        );
      },
      onTerminate: () => {
        setUserInteraction(false);
        TrackPlayManager.resume();
      },
    });
  }, [durationBarLength, pos, setPosInSec])();

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
          duration={props.duration}
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
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  progressBarContainer: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignContent: 'center',

    borderWidth: 1,
    borderColor: 'transparent', // for some reason the PanResponder seems to work better when the container has a border. (Doesn't make sense)
  },
  timeContainer: {
    width: '100%',
    height: '30%',
  },
});

export default PlayerProgress;
