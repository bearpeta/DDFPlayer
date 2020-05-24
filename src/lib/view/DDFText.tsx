import React, {useMemo} from 'react';
import {TextProps, Text, StyleSheet, TextStyle} from 'react-native';
import colors from 'res/colors';

type fontFamilyStyle = {
  fontFamily: string;
};

const DDFText = ({
  style,
  children,
  ...rest
}: React.PropsWithChildren<TextProps>): JSX.Element => {
  const propsStyle: {} = useMemo(() => {
    if (!style) {
      return styles.text;
    }
    const passedStyles = Array.isArray(style)
      ? Object.assign({}, ...style)
      : style;

    const a = [
      styles.text,
      {...passedStyles},
      _getFontFamily(style as TextStyle),
    ];
    return a;
  }, [style]);

  return (
    <Text style={propsStyle} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    //fontFamily: 'Lato-Regular',
  },
});

const _getFontFamily = (style: TextStyle): fontFamilyStyle => {
  const defaultFamily = {fontFamily: 'Lato-Regular'};
  if (style === undefined) defaultFamily;
  if (style.fontWeight === undefined) {
    return _useItalicVersion(defaultFamily, style.fontStyle as string);
  }

  switch (style.fontWeight) {
    case '100':
    case '200':
      defaultFamily.fontFamily = 'Lato-Thin';
      break;
    case '300':
      defaultFamily.fontFamily = 'Lato-Light';
      break;
    case '400':
    case '500':
    case 'normal':
      defaultFamily.fontFamily = 'Lato-Regular';
      break;
    case '600':
    case '700':
    case '800':
    case 'bold':
      defaultFamily.fontFamily = 'Lato-Bold';
      break;
    case '900':
      defaultFamily.fontFamily = 'Lato-Black';
      break;
  }

  return _useItalicVersion(defaultFamily, style.fontStyle as string);
};

// See folder src/res/fonts/Lato
const _useItalicVersion = (
  fontFamilyStyle: fontFamilyStyle,
  fontStyle: string,
) => {
  if (fontStyle !== 'italic') return fontFamilyStyle;

  if (fontFamilyStyle.fontFamily === 'Lato-Regular') {
    fontFamilyStyle.fontFamily = 'Lato-Italic';
    return fontFamilyStyle;
  }

  fontFamilyStyle.fontFamily = `${fontFamilyStyle.fontFamily}Italic`;
  return fontFamilyStyle;
};

export default DDFText;
