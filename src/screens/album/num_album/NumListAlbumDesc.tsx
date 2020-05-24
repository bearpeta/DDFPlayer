import React, {FunctionComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import DDFText from 'lib/view/DDFText';
import colors from 'res/colors';
import {AudioFile} from 'lib/audiobooks/type';

type itemProps = {
  albumItem: AudioFile;
};
const NumListAlbumDesc: FunctionComponent<itemProps> = (
  props: itemProps,
): JSX.Element => {
  return (
    <View style={styles.itemDescriptionContainer}>
      <View style={styles.numberCircle}>
        <DDFText style={styles.itemAlbumNumberText} numberOfLines={1}>
          {props.albumItem.id()}
        </DDFText>
      </View>
      <DDFText
        style={styles.itemDescriptionText}
        //numberOfLines={1}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.5}>
        {props.albumItem.album()}
      </DDFText>
    </View>
  );
};

const styles = StyleSheet.create({
  itemDescriptionContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberCircle: {
    width: 26,
    height: 26,
    borderRadius: 26 / 2,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  itemAlbumNumberText: {
    fontWeight: '300',
  },
  itemDescriptionText: {
    flex: 1,
    fontWeight: '400',
    textAlignVertical: 'center',
    fontSize: 14,
    marginLeft: 10,
    color: colors.primaryDarkest,
  },
});

export default NumListAlbumDesc;
