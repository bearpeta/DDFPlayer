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
  ToastAndroid.show('SKIP PREVIOUS', ToastAndroid.SHORT);
  TrackPlayManager.skipToPrevious();
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
