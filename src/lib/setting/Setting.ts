import {ExternalStorageDirectoryPath} from 'react-native-fs';
import {SettingOptions, SettingType, SettingOptionKeys} from './types';
import AsyncStorage from '@react-native-community/async-storage';

const storagePrefix: string = 'Settings_';

const keysWithNumericValue: Partial<SettingOptionKeys>[] = [
  'playerJumpInterval',
  'queueSize',
];

const defaultSettings: SettingOptions = {
  folderPath: `${ExternalStorageDirectoryPath}/Music/DDF/`,
  playerJumpInterval: 300,
  queueSize: 10,
  queuePicking: 'in_order',
};

const _initValue = (
  key: SettingOptionKeys,
  storedSettings: [string, string | null][],
): any => {
  for (const storedSetting of storedSettings) {
    if (storedSetting[1] === null) continue;

    // Since we add an prefix to the key when we save it. We have to remove this prefix again.
    const storedKey: SettingOptionKeys = getOptionKeyFromStorageKey(
      storedSetting[0] as string,
    );

    if (storedKey === key) {
      let value: string | number = storedSetting[1];
      // If we don't check if the value should be a number and transform it into a number, the App will crash on a native level because it expects a double instead of a string.
      if (keysWithNumericValue.includes(storedKey)) {
        value = parseInt(value, 10);
      }
      return value;
    }
  }

  // If there is no stored setting value for the key I use the default value.
  for (const defSetting of Object.entries(defaultSettings)) {
    const storedKey: SettingOptionKeys = (defSetting[0] as unknown) as SettingOptionKeys;
    if (storedKey === key) {
      return defSetting[1];
    }
  }
};

const _setup = async () => {
  const settingKeys: string[] = Object.keys(defaultSettings);
  const asyncStorageKeys = settingKeys.map((key) => _getAsyncStorageKey(key));
  const storedSetting = await AsyncStorage.multiGet(asyncStorageKeys);

  const newSettings: SettingOptions = {
    folderPath: _initValue('folderPath', storedSetting),
    playerJumpInterval: _initValue('playerJumpInterval', storedSetting),
    queueSize: _initValue('queueSize', storedSetting),
    queuePicking: _initValue('queuePicking', storedSetting),
  };
  Setting.settings = newSettings;
};

const _set = async (key: SettingOptionKeys, value: string): Promise<void> => {
  const storageKey = _getAsyncStorageKey(key);
  await AsyncStorage.setItem(storageKey, value);
  console.log(`new value ${value} set for key '${key}'`);
  await _setup();
};

const _get = (key: SettingOptionKeys) => {
  return Setting.settings[key];
};

const _getAll = () => {
  return Setting.settings;
};

const _getAsyncStorageKey = (key: string): string => {
  return `${storagePrefix}${key}`;
};

const getOptionKeyFromStorageKey = (storageKey: string): SettingOptionKeys => {
  return storageKey.replace(storagePrefix, '') as SettingOptionKeys;
};

const Setting: SettingType = {
  setup: _setup,
  get: _get,
  getAll: _getAll,
  set: _set,
  settings: {...defaultSettings},
};

export default Setting;
export {defaultSettings};
