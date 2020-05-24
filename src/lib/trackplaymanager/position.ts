import TrackPlayer from 'react-native-track-player';
import TrackPlayManager from './TrackPlayManager';
import {convertFromTrackPlayer} from 'lib/audiobooks/convert';
import {AudioFile} from 'lib/audiobooks/type';
import {saveCurrentPosition} from 'lib/audiobooks/currentProgress';
import AudiobookProvider from 'lib/audiobooks/provider';

const getPosition = async (): Promise<number> => {
  return TrackPlayer.getPosition();
};
const saveCurrentPos = async (
  callBack?: () => Promise<void>,
): Promise<void> => {
  try {
    const id: string = await TrackPlayManager.getCurrentTrack();
    const position: number = await getPosition();
    console.log('saveCurrentPos: ID: ' + id + ' ; POSITION: ' + position);
    if (id !== null) await savePosition(id, position.toString());
  } catch (e) {
    return Promise.reject(e);
  } finally {
    if (callBack) {
      await callBack();
    }
  }
};

const savePosition = async (
  trackId: string,
  position: string,
): Promise<void> => {
  const sec = parseInt(position, 10);
  // We won't save any position under 20 seconds since it doesn't make a lot of sense.
  if (isNaN(sec) || sec <= 20) return;

  let audioFile: AudioFile | null = AudiobookProvider.getById(trackId);
  if (audioFile === null) {
    const track = await TrackPlayManager.getTrack(trackId);
    if (track === null) return;
    audioFile = await convertFromTrackPlayer(track);
  }

  let newPosition = sec;
  // we reset position to zero when the track was listen until almost the end (last part of the audiobooks are just music anyways)
  if (sec >= audioFile.duration() - 30) {
    newPosition = 0;
  }
  saveCurrentPosition(audioFile, newPosition);
};

export {saveCurrentPos, savePosition, getPosition};
