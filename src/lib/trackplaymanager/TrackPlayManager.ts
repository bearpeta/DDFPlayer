import TrackPlayer, {Track, TrackMetadata} from 'react-native-track-player';
import AudiobookProvider from 'lib/audiobooks/provider';
import {AudioFile} from 'lib/audiobooks/type';
import {addEventListener, addDefaultListener} from './events';
import {usePlayerEvents, usePlayerProgress} from './hooks';
import {loadLastPlayed} from './lastPlayed';
import {seekTo, fastForward, fastRewind, forward, goBack} from './movement';
import {saveCurrentPos, getPosition} from './position';
import {getQueue, add, skipToPrevious, skipToNext} from './queue';
import setup from './setup';
import {getState} from './states';

// The reason to build these wrapping layers around the ThirdParty-library TrackPlayer is to have an easy way to exchange the TrackPlayer library if needed since changes would just have to happen in this file.

const _pause = async (): Promise<void> => {
  return saveCurrentPos(() => TrackPlayer.pause());
};

const _play = async (): Promise<void> => {
  return TrackPlayer.play();
};

const _stop = async (): Promise<void> => {
  return saveCurrentPos(() => TrackPlayer.stop());
};

const _playNew = async (audiobooks: AudioFile[]): Promise<void> => {
  await saveCurrentPos();
  await add({files: audiobooks, replace: true});
  // I don't automatically go to the current position anymore (see PlayerFileInfo.tsx)
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

const _updateMeta = async (id: string) => {
  const file = AudiobookProvider.getById(id);
  if (file === null) return;
  // for some reason "updateMetadataForTrack" expects 'title' and 'artist'
  const metaInfo: TrackMetadata = {
    title: file.title(),
    artist: file.author(),
    artwork: file.image(),
    duration: file.duration(),
  };
  return TrackPlayer.updateMetadataForTrack(id, metaInfo);
};

const _destroy = async (): Promise<void> => {
  return TrackPlayer.destroy();
};

const TrackPlayManager = {
  isInitialized: false,
  setup: async function () {
    const isInit = this.isInitialized;
    if (!this.isInitialized) this.isInitialized = true;
    setup()
      .then(() => {
        if (isInit) return;
        addDefaultListener();
        loadLastPlayed();
      })
      .catch((_e) => {
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
  updateMetadata: _updateMeta,
  destroy: async function () {
    this.isInitialized = false;
    _destroy();
  },
};

export default TrackPlayManager;
export {usePlayerEvents, usePlayerProgress};
