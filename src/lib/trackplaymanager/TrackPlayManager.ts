import TrackPlayer from 'react-native-track-player';
import setup from './setup';
import {EVENTS, addEventListener} from './events';
import {usePlayerEvents, usePlayerProgress} from './hooks';
import {saveCurrentPos, savePosition, getPosition} from './position';
import {getQueue, add, skipToPrevious, skipToNext} from './queue';
import {seekTo, fastForward, fastRewind, forward, goBack} from './movement';
import {getState} from './states';
import {AudioFile} from 'lib/audiobooks/type';
import {saveLastPlayedFileId} from './lastPlayed';

// The reason to build these wrapping layers around the ThirdParty-library TrackPlayer is to have an easy way to exchange the TrackPlayer library if needed since changes would just have to happen in this file.

const _pause = async (): Promise<void> => {
  return saveCurrentPos(() => TrackPlayer.pause());
};

const _play = (): Promise<void> => {
  return TrackPlayer.play();
};

const _stop = async (): Promise<void> => {
  return saveCurrentPos(() => TrackPlayer.stop());
};

const _playNew = async (audiobooks: AudioFile[]): Promise<void> => {
  await saveCurrentPos();
  await add({files: audiobooks, replace: true});
  // We don't automatically go to the current position anymore (see PlayerFileInfo.tsx)
  //const position = await getCurrentPosition(audiobooks[0]);
  // await TrackPlayer.seekTo(position);
  return _play();
};

const _getTrack = async (id: string): Promise<TrackPlayer.Track> => {
  return TrackPlayer.getTrack(id);
};

const _getCurrentTrack = async (): Promise<string> => {
  return TrackPlayer.getCurrentTrack();
};

const _addDefaultListener = (): void => {
  const trackChangedListener = (event: any): void => {
    if (event.nextTrack !== null) {
      saveLastPlayedFileId(event.nextTrack as string);
    }
    if (event.track === null) return;
    savePosition(event.track, event.position);
  };

  const remoteDuckListener = (event: any): void => {
    if (event.permanent) {
      _stop();
      return;
    }
    if (event.paused) {
      _pause();
      return;
    }
    _play();
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

const TrackPlayManager = {
  isInitialized: false,
  setup: async function () {
    const temp = this.isInitialized;
    if (!this.isInitialized) this.isInitialized = true;
    setup()
      .then(() => {
        if (temp) return;
        _addDefaultListener();
      })
      .catch((e) => {
        console.log(`TrackPlayManager: SETUP FAILED: ${e}`);
        this.isInitialized = false;
      });
  },
  stop: _stop,
  pause: _pause,
  resume: _play,
  playNew: _playNew,
  getQueue: getQueue,
  skipToNext: skipToNext,
  skipToPrevious: skipToPrevious,
  seekTo: seekTo,
  forward: forward,
  goBack: goBack,
  fastForward: fastForward,
  fastRewind: fastRewind,
  addQueue: add,
  getPosition: getPosition,
  getState: getState,
  getTrack: _getTrack,
  getCurrentTrack: _getCurrentTrack,
  addEventListener: addEventListener,
};

export default TrackPlayManager;
export {usePlayerEvents, usePlayerProgress};
