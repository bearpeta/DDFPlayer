import React from 'react';
import {View, StyleSheet} from 'react-native';
import DDFText from './DDFText';

type emptyListViewProps = {
  infoText: string;
};

const EmptyListView = (props: emptyListViewProps): JSX.Element => {
  return (
    <View style={styles.emptyListView}>
      <DDFText style={styles.text}>{props.infoText}</DDFText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyListView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default EmptyListView;
