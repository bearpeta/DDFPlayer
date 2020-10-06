import AsyncStorage from '@react-native-community/async-storage';
import {getCurrentPosition} from 'lib/audiobooks/currentPosition';
import AudiobookProvider from 'lib/audiobooks/provider';
import {listTypes} from 'lib/audiobooks/provider/type';
import {AudioFile} from 'lib/audiobooks/type';
import Setting from 'lib/setting/Setting';
import creator from 'screens/album/queue/creator';
import TrackPlayManager from './TrackPlayManager';

const storeKey = 'last_payed_file_id';

const getLastPlayedFile = async (): Promise<AudioFile | null> => {
  const fileId = await AsyncStorage.getItem(storeKey);
  if (fileId === null || fileId === '') {
    return null;
  }
  return AudiobookProvider.getById(fileId);
};

const saveLastPlayedFileId = async (id: string) => {
  return AsyncStorage.setItem(storeKey, id);
};

const loadLastPlayed = async (): Promise<void> => {
  const file = await getLastPlayedFile();
  if (file === null) return;

  const type: listTypes = file.isNumbered() ? 'numbered' : 'special';

  const list = await AudiobookProvider.get(type);

  const queue: AudioFile[] = creator({
    firstId: file.id(),
    files: Object.values(list),
    size: Setting.get('queueSize'),
    variant: Setting.get('queuePicking'),
  });

  if (queue.length < 1) return;
  await TrackPlayManager.addQueue({files: queue, replace: true});
  // If there is no playing file and I load the last played one, it makes sense to jump also to the last known position.eee
  getCurrentPosition(file).then((position: number) => {
    TrackPlayManager.seekTo(position);
  });
};

export {getLastPlayedFile, saveLastPlayedFileId, loadLastPlayed};
