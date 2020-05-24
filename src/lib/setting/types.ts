import {defaultSettings} from './Setting';

// random: files get picked randomly from the list, independently from the "firstId"
// in_order: files get picked in order starting by the defined "firstId" or from the beginning of the list
// in_order_repeat: same as 'in_order' but if the end of the list is reached it will continue from the beginning
export type queuePickingType = 'random' | 'in_order' | 'in_order_repeat';

export type SettingOptionKeys = keyof typeof defaultSettings;

export type SettingOptions = {
  folderPath: string;
  playerJumpInterval: number;
  queueSize: number;
  queuePicking: queuePickingType;
};

export type SettingType = {
  setup: () => Promise<void>;
  get: (key: SettingOptionKeys) => any;
  getAll: () => SettingOptions;
  set: (key: SettingOptionKeys, value: string) => Promise<void>;
  settings: SettingOptions;
};
