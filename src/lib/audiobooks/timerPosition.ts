/*
 * THESE FUNCTIONS WILL BE USED TO SAVE THE CURRENT POSITION THE USER IS AT IN AN AUDIOBOOK AUTOMATICALLY.
 * THIS FUNCTIONS CANNOT BE USED FOR MANUALLY SAVING DIFFERENT POSITIONS.
 */
import AsyncStorage from '@react-native-community/async-storage';

const _getKey = (id: string): string => {
  return `${id}_timer`;
};
const getTimerPosition = async (audiobookId: string) => {
  const pos = await AsyncStorage.getItem(_getKey(audiobookId));
  // parseFloat would be more accurate but for now I will leave it like this since the difference doesn't really matter
  return pos === null ? 0 : parseInt(pos, 10);
};

const saveTimerPosition = async (
  audiobookId: string,
  position: number,
): Promise<void> => {
  return AsyncStorage.setItem(_getKey(audiobookId), position.toString());
};

export {getTimerPosition, saveTimerPosition};
