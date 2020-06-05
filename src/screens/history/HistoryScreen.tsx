import React, {FunctionComponent, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import RootView from 'lib/view/RootView';
import {getHistory} from 'lib/history';
import {historySectionData} from './list/type';
import HistoryList from './list/HistoryList';

type SettingProps = {};

const HistoryScreen: FunctionComponent<SettingProps> = (): JSX.Element => {
  const [history, setHistory] = useState<historySectionData>([]);

  useEffect(() => {
    getHistory().then((newHistory) => {
      const sectionData: historySectionData = [];

      Object.keys(newHistory).forEach((key: string) => {
        sectionData.push({title: key, data: newHistory[key]});
      });
      setHistory(sectionData);
    });
  }, [setHistory]);

  return (
    <RootView style={styles.container}>
      <HistoryList list={history} />
    </RootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },
});

export default HistoryScreen;
