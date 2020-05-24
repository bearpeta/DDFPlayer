import TrackPlayer from 'react-native-track-player';

type stateType = {
  [key: string]: TrackPlayer.State;
};

const STATES: stateType = {
  NONE: TrackPlayer.STATE_NONE, // 0
  STOPPED: TrackPlayer.STATE_STOPPED, // 1
  READY: TrackPlayer.STATE_READY, // 2
  PLAYING: TrackPlayer.STATE_PLAYING, // 3
  PAUSED: TrackPlayer.STATE_PAUSED,
  BUFFERING: TrackPlayer.STATE_BUFFERING, // 6
  //@ts-ignore
  CONNECTING: TrackPlayer.STATE_CONNECTING, // 8
};

const getState = async (): Promise<TrackPlayer.State> => {
  return TrackPlayer.getState();
};

export {STATES, getState};
