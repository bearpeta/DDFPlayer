import {AsyncStorage} from 'react-native';

const _getKey = audiobook => {
  return audiobook.isNumbered() ? audiobook.number() : audiobook.title();
};

const saveCurrentPosition = async (audiobook, position) => {
  AsyncStorage.setItem(_getKey(audiobook), position);
};

const getCurrentPosition = async audiobook => {
  return AsyncStorage.getItem(_getKey(audiobook));
};

export {saveCurrentPosition, getCurrentPosition};
