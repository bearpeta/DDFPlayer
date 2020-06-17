import React, {useState, useMemo} from 'react';
import {View, StyleSheet, Dimensions, ViewStyle} from 'react-native';
import {EVENTS} from 'lib/trackplaymanager/events';
import {usePlayerEvents} from 'lib/trackplaymanager/hooks';
import {STATES} from 'lib/trackplaymanager/states';
import FastForward from 'res/images/player/fastForward.svg';
import FastRewind from 'res/images/player/fastRewind.svg';
import Forward10Sec from 'res/images/player/forward10Sec.svg';
import Pause from 'res/images/player/pause.svg';
import Play from 'res/images/player/play.svg';
import Replay10Sec from 'res/images/player/replay10Sec.svg';
import SkipNext from 'res/images/player/skipNext.svg';
import SkipPrevious from 'res/images/player/skipPrevious.svg';
import {
  onPlay,
  onPause,
  onSkipNext,
  onSkipPrevious,
  onReplayTenSecond,
  onForwardTenSec,
  onFastForward,
  onFastRewind,
} from './actions';
import ControlButton from './ControlButton';

type controlProps = {
  style?: ViewStyle;
};

const amountBtn = 7;

const deviceWidth = Dimensions.get('window').width;
const paddingButtonRow = 10;
const buttonWide = (deviceWidth - 2 * paddingButtonRow) / amountBtn;

const PlayerControl = (props: controlProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playPauseView = useMemo((): JSX.Element => {
    if (isPlaying) {
      return (
        <ControlButton
          onPress={onPause}
          image={<Pause width={buttonWide} height={buttonWide} />}
        />
      );
    }

    return (
      <ControlButton
        onPress={onPlay}
        image={<Play width={buttonWide} height={buttonWide} />}
      />
    );
  }, [isPlaying]);

  usePlayerEvents([EVENTS.CHANGE_PLAYBACK_STATE], (event: any) => {
    /*
      // Just gets fired when the "play"/"pause/stop" button in the notification bar or lock screen get pressed
      if ([EVENTS.PLAY, EVENTS.PAUSE, EVENTS.STOP].includes(event.type)) {
        setIsPlaying(event.type === EVENTS.PLAY);
      }
    */
    if (event.type === EVENTS.CHANGE_PLAYBACK_STATE) {
      setIsPlaying(event.state === STATES.PLAYING);
    }
  });
  return (
    <View style={[styles.container, props.style]}>
      <ControlButton
        onPress={onSkipPrevious}
        image={<SkipPrevious width={buttonWide} height={buttonWide} />}
      />
      <ControlButton
        onPress={onFastRewind}
        image={<FastRewind width={buttonWide} height={buttonWide} />}
      />
      <ControlButton
        onPress={onReplayTenSecond}
        image={<Replay10Sec width={buttonWide} height={buttonWide} />}
      />
      {playPauseView}
      <ControlButton
        onPress={onForwardTenSec}
        image={<Forward10Sec width={buttonWide} height={buttonWide} />}
      />
      <ControlButton
        onPress={onFastForward}
        image={<FastForward width={buttonWide} height={buttonWide} />}
      />
      <ControlButton
        onPress={onSkipNext}
        image={<SkipNext width={buttonWide} height={buttonWide} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerControl;
