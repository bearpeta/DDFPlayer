import TrackPlayer from 'react-native-track-player';
import {AudioFile} from 'lib/audiobooks/type';
import {convertForTrackPlayer} from 'lib/audiobooks/convert';

type addPosition = 'start' | 'end';

export type addOptions = {
  files: AudioFile[]; // define which track should be played next
  replace: boolean; // Defines if the existing queue should be replaced or not
  position?: addPosition; // in combination with 'keepCurrent' define if the 'first' file should be add at the beginning or end of the queue
};

const skipToNext = async (): Promise<void> => {
  return TrackPlayer.skipToNext().catch((e) => console.log(e));
};

const skipToPrevious = async (): Promise<void> => {
  return TrackPlayer.skipToPrevious().catch((e) => console.log(e));
};

const getQueue = async (): Promise<TrackPlayer.Track[]> => {
  return TrackPlayer.getQueue();
};

const add = async (options: addOptions) => {
  if (options.replace) {
    return _replaceQueue(options.files);
  }

  // normal queue behavior is to add it at the end, so if position isn't defined we will add the new files at the end
  const position: addPosition = options.position ? options.position : 'end';

  const tracks = await getQueue();
  let beforeId: string | undefined;
  if (tracks.length >= 1 && position) {
    beforeId = tracks[0].id;
  }
  return _addToQueue(options.files, beforeId);
};

const _replaceQueue = async (newFiles: AudioFile[]): Promise<void> => {
  await TrackPlayer.reset();
  return _addToQueue(newFiles);
};

const _addToQueue = async (
  audiobooks: AudioFile[],
  beforeId?: string,
): Promise<void> => {
  const tracks: TrackPlayer.Track[] = audiobooks.map((file) =>
    convertForTrackPlayer(file),
  );
  return TrackPlayer.add(tracks, beforeId);
};

export {getQueue, add, skipToNext, skipToPrevious};
