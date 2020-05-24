import AsyncStorage from '@react-native-community/async-storage';

type InfoKey = 'background_timeout_id' | 'background_interval_id';

const getInfo = (key: InfoKey): Promise<string | null> => {
  return AsyncStorage.getItem(key);
};

const getMultipleInfos = (
  keys: InfoKey[],
): Promise<[string, string | null][]> => {
  return AsyncStorage.multiGet(keys);
};

const setInfo = (key: InfoKey, value: string): Promise<void> => {
  return AsyncStorage.setItem(key, value);
};

const removeInfo = (key: InfoKey) => {
  return AsyncStorage.removeItem(key);
};

const InfoStorage = {
  set: setInfo,
  get: getInfo,
  getMultiple: getMultipleInfos,
  remove: removeInfo,
};

export default InfoStorage;
