/*
 * THESE FUNCTIONS WILL BE USED TO SAVE THE CURRENT POSITION THE USER IS AT IN AN AUDIOBOOK AUTOMATICALLY.
 * THIS FUNCTIONS CANNOT BE USED FOR MANUALLY SAVING DIFFERENT POSITIONS.
 */
import AsyncStorage from '@react-native-community/async-storage';
import {AudioFile} from './type';

const _getKey = (audiobook: AudioFile): string => {
  return audiobook.id();
};
const getCurrentPosition = async (audiobook: AudioFile) => {
  const pos = await AsyncStorage.getItem(_getKey(audiobook));
  // parseFloat would be more accurate but for now I will leave it like this since the difference doesn't really matter
  return pos === null ? 0 : parseInt(pos, 10);
};

const saveCurrentPosition = async (
  audiobook: AudioFile,
  position: number,
): Promise<void> => {
  return AsyncStorage.setItem(_getKey(audiobook), position.toString());
};

export {saveCurrentPosition, getCurrentPosition};
