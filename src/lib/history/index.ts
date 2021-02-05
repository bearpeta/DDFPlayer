import AsyncStorage from '@react-native-community/async-storage';
import {History} from './type';

const STORAGE_KEY = 'history';

let currentHistory: History = {};

const _getCurrentDateTime = (): string => {
  const dateObj = new Date();
  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

const _loadCurrentHistory = async (): Promise<void> => {
  // If the currentHistory has any key it means it is already loaded and we don't have to do anything.
  if (Object.keys(currentHistory).length !== 0) {
    return;
  }

  const history = await AsyncStorage.getItem(STORAGE_KEY);
  // Check if we have a history
  if (history === null) return;

  currentHistory = JSON.parse(history);
};

const getHistory = async () => {
  await _loadCurrentHistory();
  return currentHistory;
};

const addHistory = async (id: string): Promise<void> => {
  await _loadCurrentHistory();
  const currentDateTime = _getCurrentDateTime();
  const fullDate = currentDateTime.split(' ')[0];

  if (currentHistory[fullDate] === undefined) {
    currentHistory = {[fullDate]: [], ...currentHistory};
  }

  currentHistory[fullDate].unshift({id, date: currentDateTime});

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentHistory)).then(() =>
    _loadCurrentHistory(),
  );
};

export {addHistory, getHistory};
