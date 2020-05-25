import {ToastAndroid} from 'react-native';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';

const onPlay = () => {
  ToastAndroid.show('PLAY', ToastAndroid.SHORT);
  TrackPlayManager.resume();
};

const onPause = () => {
  ToastAndroid.show('PAUSE', ToastAndroid.SHORT);
  TrackPlayManager.pause();
};

const onSkipNext = () => {
  ToastAndroid.show('SKIP NEXT', ToastAndroid.SHORT);
  TrackPlayManager.skipToNext();
};

const onSkipPrevious = () => {
  TrackPlayManager.getPosition()
    .catch((_msg) => {
      TrackPlayManager.skipToPrevious();
    })
    .then((position) => {
      // if the audiofile is playing for longer than 20 seconds it won't load the previous file. Instead it will jump to the beginning how most "skip previous" functions work in other music apps.
      if (position > 20) {
        TrackPlayManager.seekTo(0);
        return;
      }
      ToastAndroid.show('SKIP PREVIOUS', ToastAndroid.SHORT);
      TrackPlayManager.skipToPrevious();
    });
};

const onReplayTenSecond = () => {
  ToastAndroid.show('REPLAY TEN SECOND', ToastAndroid.SHORT);
  TrackPlayManager.goBack(10);
};

const onForwardTenSec = () => {
  ToastAndroid.show('FORWARD TEN SECOND', ToastAndroid.SHORT);
  TrackPlayManager.forward(10);
};

const onFastForward = () => {
  ToastAndroid.show('FAST FORWARD', ToastAndroid.SHORT);
  TrackPlayManager.fastForward();
};

const onFastRewind = () => {
  ToastAndroid.show('FAST REWIND', ToastAndroid.SHORT);
  TrackPlayManager.fastRewind();
};

export {
  onPlay,
  onPause,
  onSkipNext,
  onSkipPrevious,
  onFastForward,
  onFastRewind,
  onForwardTenSec,
  onReplayTenSecond,
};
