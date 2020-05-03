import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AlbumListItemCoverImage from 'lib/view/AlbumListItemCoverImage';
import colors from 'res/colors';

const AlbumListItem = ({listIndex, title, onPress, imgSource}) => {
  let extraStyle = {};
  if (listIndex % 2 === 0) {
    //console.log(title);
    extraStyle.marginRight = 5;
  }

  return (
    <View style={[styles.albumListItemContainer, extraStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
        <View style={styles.imageContainer}>
          <AlbumListItemCoverImage style={styles.picture} source={imgSource} />
        </View>
        <View>
          <Text style={styles.text} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  albumListItemContainer: {
    flex: 0.5,
    //aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 3,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  touchableContainer: {
    //paddingTop: 5,
    paddingBottom: 5,
    //width: '100%',
    // height: '100%',
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 5,
    fontWeight: 'bold',
  },
});

export default AlbumListItem;
