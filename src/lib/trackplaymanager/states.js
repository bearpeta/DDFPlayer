import TrackPlayer from 'react-native-track-player';

const STATES = {
  NONE: TrackPlayer.STATE_NONE, // 0
  STOPPED: TrackPlayer.STATE_STOPPED, // 1
  READY: TrackPlayer.STATE_READY, // 2
  PLAYING: TrackPlayer.STATE_PLAYING, // 3
  PAUSED: TrackPlayer.STATE_PAUSED,
  BUFFERING: TrackPlayer.STATE_BUFFERING, // 6
  CONNECTING: TrackPlayer.STATE_CONNECTING, // 8
};

export {STATES};

/* 
        const stateName = Object.keys(STATES).find(
          key => STATES[key] === event.state,
        );
        console.log(`STATE: ${event.state}, NAME: ${stateName}`);
 */
