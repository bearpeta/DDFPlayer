import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {AudioFile} from 'lib/audiobooks/type';
import FileListItem from './FileListItem';

type itemProps = {
  files: AudioFile[];
  onPlay: (item: AudioFile) => void;
  onPause: (item: AudioFile) => void;
  playingFileId: string | undefined;
};
const FileList = (props: React.PropsWithChildren<itemProps>): JSX.Element => {
  return (
    <View
      style={styles.listContainer}
      onMoveShouldSetResponder={() => true}
      onStartShouldSetResponder={() => true}>
      <FlatList
        style={styles.list}
        data={props.files}
        extraData={props.files}
        //contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(file) => file.id()}
        contentContainerStyle={styles.listContentContainer}
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
        renderItem={({item}) => (
          <FileListItem
            file={item}
            onPlay={props.onPlay}
            onPause={props.onPause}
            playingFileId={props.playingFileId}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexGrow: 1,
  },
  listContentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  listItemSeparator: {
    height: 5,
    //borderWidth: 0.5,
    //borderColor: colors.white,
  },
});

export default FileList;
