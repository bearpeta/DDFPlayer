import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AlbumListItemCoverImage from 'lib/view/AlbumListItemCoverImage';

const AlbumListItem = ({listIndex, title, onPress, imgSource}) => {
  let extraStyle = {};
  if (listIndex % 2 === 0) {
    //console.log(title);
    extraStyle.marginRight = 5;
  }

  return (
    <View style={[styles.albumListItemContainer, extraStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
        <AlbumListItemCoverImage source={imgSource} />
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  albumListItemContainer: {
    flex: 0.5,
    aspectRatio: 1,
    //width: (width - 20) / 2,
    // height: width / 2,
    borderWidth: 2,
    borderColor: 'yellow',
    backgroundColor: 'white',
    // padding: 5,
    // margin: 5,
  },
  touchableContainer: {
    padding: 5,
    width: '100%',
    height: '100%',
  },
});

export default AlbumListItem;
