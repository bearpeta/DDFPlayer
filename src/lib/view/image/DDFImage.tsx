import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import images from 'res/image';

type resizeModes = 'stretch' | 'center' | 'contain' | 'cover';

type coverImageProps = {
  source: string;
  resizeMode?: resizeModes;
};

const DDFImage = (props: coverImageProps) => {
  let imgSource: Source | number = {uri: props.source};
  if (props.source === '') {
    imgSource = images.defaultAlbumCover;
  }

  let resizeMode: resizeModes = FastImage.resizeMode.stretch;
  if (props.resizeMode) {
    resizeMode = props.resizeMode;
  }

  return (
    <FastImage
      style={styles.albumCoverImage}
      source={imgSource}
      resizeMode={resizeMode}
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

export default DDFImage;
