import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyListView = props => {
  return (
    <View style={styles.emptyListView}>
      <Text style={styles.text}>{props.infoText}</Text>
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
