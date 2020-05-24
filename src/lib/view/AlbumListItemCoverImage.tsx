import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import images from 'res/image';

type coverImageProps = {
  source: string;
};

const AlbumListItemCoverImage = (props: coverImageProps) => {
  let imgSource: Source | number = {uri: props.source};
  if (props.source === '') {
    imgSource = images.defaultAlbumCover;
  }

  return (
    <FastImage
      style={styles.albumCoverImage}
      source={imgSource}
      resizeMode={FastImage.resizeMode.stretch}
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
