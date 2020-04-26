import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';
import {convertForTrackPlayer} from 'lib/audiobooks/convert';
import {EVENTS} from './events';
import {STATES} from './states';
import Play from 'res/images/player/play.svg';
import images from 'res/image';

// The reason to build these wrapping layers around the ThirdParty-library TrackPlayer is to have an easy way to exchange the TrackPlayer library if needed since changes would just have to happen in this file.

const queue = [];

const _setup = () => {
  TrackPlayer.setupPlayer({
    backBuffer: 60,
  }).then(() => {
    TrackPlayer.updateOptions({
      jumpInterval: 300, // 5min
      alwaysPauseOnInterruption: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      ],
      notificationCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  });
};

const _pause = () => {
  TrackPlayer.pause();
};

const _play = () => {
  TrackPlayer.play();
};

const _stop = () => {
  TrackPlayer.stop();
};

const _skipToNext = async () => {
  await TrackPlayer.skipToNext().catch(e => console.log(e));
};

const _skipToPrevious = async () => {
  await TrackPlayer.skipToPrevious();
};

const _forward = async seconds => {
  const position = await TrackPlayer.getPosition();
  await TrackPlayer.seekTo(position + seconds);
};

const _goBack = async seconds => {
  const position = await TrackPlayer.getPosition();
  await TrackPlayer.seekTo(position - seconds);
};

const _fastForward = () => {};

const _fastRewind = () => {};

const _playNew = async audiobook => {
  try {
    await TrackPlayer.reset();
    const track = convertForTrackPlayer(audiobook);
    console.log(track);
    await TrackPlayer.add(track);
    return _play();
  } catch (e) {
    return new Promise.reject(e);
  }
};

const _addEventListener = async (event, listener) => {
  return TrackPlayer.addEventListener(EVENTS[event], listener);
};

const usePlayerEvents = (events, listener) => {
  useTrackPlayerEvents(events, listener);
};

const TrackPlayManager = {
  setup: _setup,
  stop: _stop,
  pause: _pause,
  resume: _play,
  playNew: _playNew,
  skipToNext: _skipToNext,
  skipToPrevious: _skipToPrevious,
  forward: _forward,
  goBack: _goBack,
  fastForward: _fastForward,
  fastRewind: _fastRewind,
  addEventListener: _addEventListener,
};

export default TrackPlayManager;
export {usePlayerEvents};
