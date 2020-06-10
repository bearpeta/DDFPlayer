import AsyncStorage from '@react-native-community/async-storage';
import AudiobookProvider from 'lib/audiobooks/provider';
import {AudioFile} from 'lib/audiobooks/type';

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

export {getLastPlayedFile, saveLastPlayedFileId};
