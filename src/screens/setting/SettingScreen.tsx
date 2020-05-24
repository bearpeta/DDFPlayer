import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import RootView from 'lib/view/RootView';
import DDFText from 'lib/view/DDFText';
import Setting, {defaultSettings} from 'lib/setting/Setting';
import {SettingOptionKeys} from 'lib/setting/types';
import colors from 'res/colors';

type SettingProps = {};

const inMinutes = (seconds: number) => seconds / 60;
const inSeconds = (minutes: number) => minutes * 60;

const SettingScreen: FunctionComponent<SettingProps> = (): JSX.Element => {
  const [settingChanged, setSettingChanged] = useState(true);
  const [folderPath, setFolderPath] = useState<string>(
    defaultSettings.folderPath,
  );

  // I want to show the jumpInterval in minutes, that's why the value gets divided by 60.
  const [jumpInterval, setJumpInterval] = useState<number>(
    inMinutes(defaultSettings.playerJumpInterval),
  );
  const [queueSize, setQueueSize] = useState<number>(defaultSettings.queueSize);
  const [queuePicking, setQueuePicking] = useState<string>(
    defaultSettings.queuePicking,
  );

  useEffect(() => {
    if (!settingChanged) return;
    const settingOptions = Setting.getAll();
    setFolderPath(settingOptions.folderPath);
    setJumpInterval(inMinutes(settingOptions.playerJumpInterval));
    setQueuePicking(settingOptions.queuePicking);
    setQueueSize(settingOptions.queueSize);
    setSettingChanged(false);
  }, [
    settingChanged,
    setSettingChanged,
    setFolderPath,
    setJumpInterval,
    setQueueSize,
    setQueuePicking,
  ]);

  const _saveSetting = useCallback(
    async (key: SettingOptionKeys, value: string): Promise<void> => {
      await Setting.set(key, value);
      setSettingChanged(true);
    },
    [],
  );

  return (
    <RootView style={styles.container}>
      <View style={styles.settingContainer}>
        <DDFText style={styles.settingLabel}>{`Folder path:`}</DDFText>
        <TextInput
          style={styles.settingInput}
          onChangeText={(text) => setFolderPath(text)}
          value={folderPath}
          onEndEditing={(e) => {
            _saveSetting('folderPath', e.nativeEvent.text);
          }}
        />
      </View>
      <View style={styles.settingContainer}>
        <DDFText
          style={
            styles.settingLabel
          }>{`Fast Forward/Rewind interval: (in minutes)`}</DDFText>
        <TextInput
          style={styles.settingInput}
          keyboardType="number-pad"
          onChangeText={(text) => {
            let interval = text;
            if (interval === '' || interval === 'NaN') interval = '0';
            setJumpInterval(parseInt(interval, 10));
          }}
          value={jumpInterval.toString()}
          onEndEditing={(e) => {
            const intervalInSec = inSeconds(
              parseInt(e.nativeEvent.text, 10),
            ).toString();
            _saveSetting('playerJumpInterval', intervalInSec);
          }}
        />
      </View>
      <View style={styles.settingContainer}>
        <DDFText
          style={styles.settingLabel}>{`Queue creation variation:`}</DDFText>

        <Picker
          mode="dialog"
          prompt="Choose how the queue should be created for numbered albums:"
          selectedValue={queuePicking}
          style={styles.settingDropdown}
          onValueChange={(itemValue, _itemIndex) => {
            setQueuePicking(itemValue as string);
            _saveSetting('queuePicking', itemValue as string);
          }}>
          <Picker.Item
            label="In order (stops at the end of last album)"
            value="in_order"
          />
          <Picker.Item label="In order (start over)" value="in_order_repeat" />
          <Picker.Item label="Random" value={'random'} />
        </Picker>
      </View>
      <View style={styles.settingContainer}>
        <DDFText style={styles.settingLabel}>{`Queue size:`}</DDFText>
        <TextInput
          style={styles.settingInput}
          keyboardType="number-pad"
          value={queueSize.toString()}
          onChangeText={(text) => {
            let size = text;
            if (size === '' || size === 'NaN') size = '0';
            setQueueSize(parseInt(size, 10));
          }}
          onEndEditing={(e) => {
            _saveSetting('queueSize', e.nativeEvent.text);
          }}
        />
      </View>
    </RootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  settingContainer: {
    height: '20%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 15,
    marginBottom: 15,
  },
  settingLabel: {
    marginBottom: 15,
    fontWeight: 'bold',
  },
  settingInput: {
    //flex: 1,
    minWidth: 100,
    height: 50,

    color: colors.primaryDark,
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
    elevation: 5,
  },
  settingDropdown: {
    minWidth: 250,
    height: 50,

    color: colors.primaryDark,
    backgroundColor: colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    //paddingHorizontal: 10,
    textAlign: 'center',
    //elevation: 5,
  },
});

export default SettingScreen;
