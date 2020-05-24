import React, {useMemo} from 'react';
import {View, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import AlbumListItemCoverImage from 'lib/view/AlbumListItemCoverImage';
import colors from 'res/colors';

type listItemType = {
  listIndex: number;
  description: JSX.Element;
  onPress: () => void;
  imgSource: string;
};

const AlbumListItem = (props: listItemType) => {
  const extraStyle = useMemo((): ViewStyle => {
    if (props.listIndex % 2 === 0) {
      return {
        marginRight: 5,
      };
    }

    return {};
  }, [props.listIndex]);

  return (
    <View style={[styles.albumListItemContainer, extraStyle]}>
      <TouchableOpacity
        onPress={props.onPress}
        style={styles.touchableContainer}
        activeOpacity={0.7}>
        <View style={styles.imageContainer}>
          <AlbumListItemCoverImage source={props.imgSource} />
        </View>
        <View style={styles.descriptionContainer}>{props.description}</View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  albumListItemContainer: {
    flex: 0.5,
    //aspectRatio: 1,
    backgroundColor: colors.almostWhite,
    borderRadius: 10,
    overflow: 'hidden',

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  touchableContainer: {
    //paddingBottom: 5,
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
  },
  descriptionContainer: {
    minHeight: 40,
    justifyContent: 'center',
  },
});

export default AlbumListItem;

/*
<DDFText style={styles.text} numberOfLines={1}>
            {props.title}
          </DDFText>*/
