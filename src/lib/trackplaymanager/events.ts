// @ts-ignore
import TrackPlayer, {TrackPlayerEvents} from 'react-native-track-player';
import {saveLastPlayedFileId} from './lastPlayed';
import {savePosition} from './position';
import TrackPlayManager from './TrackPlayManager';

type eventType = {
  [key: string]: TrackPlayer.EventType;
};
// Mapping between internal  and TrackPlayer event names.
const EVENTS: eventType = {
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

const addEventListener = (
  event: TrackPlayer.EventType,
  listener: (data: any) => void,
) => {
  return TrackPlayer.addEventListener(event, listener);
};

const addDefaultListener = (): void => {
  const trackChangedListener = (event: any): void => {
    if (event.nextTrack !== null) {
      saveLastPlayedFileId(event.nextTrack as string);
    }
    if (event.track === null) return;
    savePosition(event.track, event.position);
  };

  const remoteDuckListener = (event: any): void => {
    // I want to test if I can ignore permanent, because I cannot control the notification by myself and I don't want the notification to disappear because the playback got interrupted.
    /*if (event.permanent) {
      _stop();
      return;
    } */

    if (event.paused) {
      TrackPlayManager.pause();
      return;
    }
    TrackPlayManager.resume();
  };

  const queueEndedListener = (event: any): void => {
    if (event.track === null) return;
    savePosition(event.track, event.position);
    saveLastPlayedFileId('0');
  };

  addEventListener(EVENTS.TRACK_CHANGED, trackChangedListener);
  addEventListener(EVENTS.INTERRUPTION, remoteDuckListener);
  addEventListener(EVENTS.QUEUE_ENDED, queueEndedListener);
};

export {EVENTS, addEventListener, addDefaultListener};
