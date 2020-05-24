import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {AudioFile} from 'lib/audiobooks/type';
import Play from 'res/images/player/play.svg';
import Pause from 'res/images/player/pause.svg';
import colors from 'res/colors';
import DDFText from 'lib/view/DDFText';

type itemProps = {
  file: AudioFile;
  onPlay: (item: AudioFile) => void;
  onPause: (item: AudioFile) => void;
  playingFileId: string | undefined;
};
const FileListItem = (props: itemProps): JSX.Element => {
  let buttonImage = <Play width={50} height={50} />;
  let buttonAction: (item: AudioFile) => void = props.onPlay;
  let isPlayingStyle = {};
  if (props.playingFileId === props.file.id()) {
    isPlayingStyle = {color: colors.blue};
    buttonImage = <Pause width={50} height={50} />;
    buttonAction = props.onPause;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => buttonAction(props.file)}>
            {buttonImage}
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <DDFText style={isPlayingStyle}>{props.file.title()}</DDFText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
  },
  content: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  actionContainer: {
    height: '100%',
    width: '20%',
    // borderWidth: 2,
    // borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    // borderWidth: 2,
    // borderColor: 'orange',
  },
});

export default FileListItem;
