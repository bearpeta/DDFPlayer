import {TrackPlayerEvents} from 'react-native-track-player';

// Mapping between internal  and TrackPlayer event names.
const EVENTS = {
  PLAY: TrackPlayerEvents.REMOTE_PLAY,
  PAUSE: TrackPlayerEvents.REMOTE_PAUSE,
  STOP: TrackPlayerEvents.REMOTE_STOP,
  SKIP_NEXT: 'remote-next', // Seems to be forgotten in the eventTypes.js file (see react-native-track-player)
  SKIP_PREVIOUS: TrackPlayerEvents.REMOTE_PREVIOUS,
  SEEK_TO: TrackPlayerEvents.REMOTE_SEEK, // FIRED BY BUTTONS FORWARD_10_SEC AND GO_BACK_10_SEC
  FAST_FORWARD: TrackPlayerEvents.REMOTE_JUMP_FORWARD,
  FAST_REWIND: TrackPlayerEvents.REMOTE_JUMP_BACKWARD,
  INTERRUPTION: TrackPlayerEvents.REMOTE_DUCK,
  CHANGE_PLAYBACK_STATE: TrackPlayerEvents.PLAYBACK_STATE,
  TRACK_CHANGED: TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
  QUEUE_ENDED: TrackPlayerEvents.PLAYBACK_QUEUE_ENDED,
  PLAYBACK_ERROR: TrackPlayerEvents.PLAYBACK_ERROR,
};

export {EVENTS};
