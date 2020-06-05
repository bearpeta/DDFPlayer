import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import SettingsIcon from 'res/images/settings_icon.svg';
import SortIcon from 'res/images/sort_icon.svg';
import HistoryIcon from 'res/images/history_icon.svg';

type viewProps = {
  onSortPress?: () => void;
  onHistoryPress: () => void;
  onSettingPress: () => void;
};

type sortButtonProps = {
  onSortPress?: () => void;
};

const HeaderRightView = (props: viewProps) => {
  return (
    <View style={styles.container}>
      <_SortButton onSortPress={props.onSortPress} />
      <TouchableOpacity style={styles.button} onPress={props.onHistoryPress}>
        <HistoryIcon width={'100%'} height={'100%'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={props.onSettingPress}>
        <SettingsIcon width={'100%'} height={'100%'} />
      </TouchableOpacity>
    </View>
  );
};

const _SortButton = (props: sortButtonProps): JSX.Element => {
  if (!props.onSortPress) {
    return <View />;
  }
  return (
    <TouchableOpacity style={styles.button} onPress={props.onSortPress}>
      <SortIcon width={'100%'} height={'100%'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    aspectRatio: 2,
    //borderWidth: 1,
    //borderColor: 'yellow',
    flexDirection: 'row',
    paddingRight: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    height: '50%',
    marginLeft: 10,
    aspectRatio: 1,
  },
});

export default HeaderRightView;
