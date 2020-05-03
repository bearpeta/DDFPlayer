import React from 'react';
import {Image, StyleSheet} from 'react-native';
import images from 'res/image';

const AlbumListItemCoverImage = ({source}) => {
  // TODO : As soon as I know where I should get the cover image from (directly from mp3 or separate)
  let imgSrc = source;
  if (source === '') {
    imgSrc = images.defaultAlbumCover;
  }
  return (
    <Image
      style={styles.albumCoverImage}
      source={{uri: imgSrc}}
      resizeMode="stretch"
    />
  );
};

const styles = StyleSheet.create({
  albumCoverImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  },
});

export default AlbumListItemCoverImage;
