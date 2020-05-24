import React, {useMemo} from 'react';
import {ImageSourcePropType} from 'react-native';
import {AudioFile} from 'lib/audiobooks/type';
import images from 'res/image';
import FileList from './FileList';
import ModalHeader from './ModalHeader';
import DDFModal from 'lib/view/DDFModal';

type extendProps = {
  isVisible: boolean;
  files: AudioFile[];
  onRequestClose: () => void;
  onPlayAll: () => void;
  onPlay: (item: AudioFile) => void;
  onPause: (item: AudioFile) => void;
  playingFileId?: string;
};

const SpecialFilesModal = (props: extendProps) => {
  const imgSource: ImageSourcePropType = useMemo(() => {
    if (props.files.length < 1) {
      return images.defaultAlbumCover;
    }
    return {uri: props.files[0].image()};
  }, [props.files]);

  return (
    <DDFModal isVisible={props.isVisible} onRequestClose={props.onRequestClose}>
      <ModalHeader imgSource={imgSource} onPlayAll={props.onPlayAll} />
      <FileList
        files={props.files}
        onPlay={props.onPlay}
        onPause={props.onPause}
        playingFileId={props.playingFileId}
      />
    </DDFModal>
  );
};

//const styles = StyleSheet.create({});

export default SpecialFilesModal;
