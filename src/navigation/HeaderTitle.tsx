import React, {useMemo} from 'react';
import {StackHeaderTitleProps} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';
import DDFText from 'lib/view/DDFText';
import colors from 'res/colors';

const HeaderTitle = (props: StackHeaderTitleProps): JSX.Element => {
  const color = useMemo(() => ({color: props.tintColor ?? colors.white}), [
    props.tintColor,
  ]);

  const textStyle = useMemo(() => ({...styles.text, ...props.style}), [
    props.style,
  ]);

  return (
    <View style={styles.container}>
      <DDFText
        onLayout={props.onLayout}
        allowFontScaling={props.allowFontScaling}
        style={{...textStyle, ...color}}>
        {`Die Drei ?`}
      </DDFText>
      <DDFText
        onLayout={props.onLayout}
        allowFontScaling={props.allowFontScaling}
        style={{...textStyle, color: colors.red}}>
        {`?`}
      </DDFText>
      <DDFText
        onLayout={props.onLayout}
        allowFontScaling={props.allowFontScaling}
        style={{...textStyle, color: colors.blue}}>
        {`?`}
      </DDFText>
      <DDFText
        onLayout={props.onLayout}
        allowFontScaling={props.allowFontScaling}
        style={{...textStyle, ...color}}>
        {` - Player`}
      </DDFText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 22,
    fontWeight: '400',
  },
});

export default HeaderTitle;
