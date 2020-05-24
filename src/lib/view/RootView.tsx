import React from 'react';
import {PropsWithChildren} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, StatusBar} from 'react-native';
import colors from 'res/colors';

type RootViewProps = {
  style?: StyleProp<ViewStyle>;
};

const RootView = (props: PropsWithChildren<RootViewProps>) => {
  return (
    <View style={[styles.container, props.style]}>
      <StatusBar
        backgroundColor={colors.primaryDarkest}
        barStyle={'light-content'}
      />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLight,
  },
});
export default RootView;
