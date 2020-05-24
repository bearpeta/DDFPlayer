import {Track} from 'react-native-track-player';
import createFromFilePath from './create';
import {AudioFile} from './type';
import AudiobookProvider from './provider';

const convertForTrackPlayer = (audiobook: AudioFile): Track => {
  // resolving path from file uri has problems if special chars like '?' aren't encoded properly
  const filePath = audiobook.filePath().replace('???', '%3F%3F%3F');

  let track: Track = {
    id: audiobook.id(), // Must be a string, required
    url: `file://${filePath}`, // Load media from storage

    title: audiobook.title(),
    artist: audiobook.author(),
    album: audiobook.album(),
    genre: 'Audiobook',
    //date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: audiobook.image(), // Load artwork from the network
  };

  if (audiobook.duration() > 0) {
    track.duration = audiobook.duration();
  }

  return track;
};

const convertFromTrackPlayer = async (track: Track): Promise<AudioFile> => {
  const id = track.id;
  const file = AudiobookProvider.getById(id);
  if (file !== null) {
    console.log('convertFromTrackPlayer: found in provider');
    return file;
  }
  console.log('convertFromTrackPlayer: not found in provider');

  // react-native-track-player adds 'file://' to the url value which I don't want in 'createFromFilePath'
  if (track.url.startsWith('file://')) {
    track.url = track.url.replace('file://', '');
  }

  return createFromFilePath(track.url);
};

export {convertForTrackPlayer, convertFromTrackPlayer};
