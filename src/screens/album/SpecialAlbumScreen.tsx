import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {AudioFile} from 'lib/audiobooks/type';
import PlayerModal from 'lib/player/PlayerModal';
import Setting from 'lib/setting/Setting';
import {EVENTS} from 'lib/trackplaymanager/events';
import {STATES} from 'lib/trackplaymanager/states';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import DDFText from 'lib/view/DDFText';
import RootView from 'lib/view/RootView';
import colors from 'res/colors';
import HeaderRightView from 'navigation/HeaderRightView';
import AlbumList from 'screens/album/list/AlbumList';
import creator from 'screens/album/queue/creator';
import {screenStyles} from 'screens/album/styles';
import SpecialFilesModal from './extend_modal/SpecialFilesModal';
import useAlbumPlayer from './hooks/useAlbumPlayer';

type merged = {
  [key: number]: AudioFile;
};
const SpecialAlbumScreen = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalPlayingFileId, setModalPlayingFileId] = useState<
    string | undefined
  >(undefined);
  const [modalAlbumFiles, setModalAlbumFiles] = useState<AudioFile[]>([]);

  const [
    audiobookList,
    isPlayerOpen,
    playingFile,
    displayTitle,
    lastSavedPosition,
    setIsPlayerOpen,
  ] = useAlbumPlayer('special');

  useEffect(() => {
    TrackPlayManager.addEventListener(EVENTS.CHANGE_PLAYBACK_STATE, (event) => {
      if (event.state === STATES.PAUSED || event.state === STATES.STOPPED) {
        setModalPlayingFileId(undefined);
        return;
      }

      if (event.state === STATES.PLAYING) {
        setModalPlayingFileId(playingFile?.id());
        return;
      }
    });
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useFocusEffect(
    React.useCallback(() => {
      navigation.dangerouslyGetParent()!.setOptions({
        headerRight: () => {
          return (
            <HeaderRightView
              onHistoryPress={() => navigation.navigate('HistoryScreen')}
              onSettingPress={() => {
                navigation.navigate('SettingScreen');
              }}
            />
          );
        },
      });
    }, [navigation]),
  );

  const mergedSameAlbums = useMemo((): merged[] => {
    const list: {[key: string]: merged} = {};
    Object.values(audiobookList).forEach((audiobook) => {
      const trackNum = audiobook.trackNumber();
      if (!list[audiobook.album()]) {
        list[audiobook.album()] = {[trackNum]: audiobook};
        return;
      }

      if (!list[audiobook.album()][trackNum]) {
        list[audiobook.album()][trackNum] = audiobook;
        return;
      }

      // in case the meta data aren't correct, in this case the track number. If the trackNumber already exists, we add as the next higher track number.
      const newTrackNumber = Object.keys(list[audiobook.album()]).length + 1;
      list[audiobook.album()][newTrackNumber] = audiobook;
    });

    return Object.values(list).sort((a: merged, b: merged) => {
      return Object.keys(a).length - Object.keys(b).length;
    });
  }, [audiobookList]);

  const _isAlreadyPlaying = useCallback(
    (id: string): boolean => {
      return playingFile !== undefined && id === playingFile!.id();
    },
    [playingFile],
  );

  const resumePlayingFile = useCallback((): void => {
    TrackPlayManager.getState().then((state) => {
      if (state !== STATES.PLAYING) {
        TrackPlayManager.resume();
      }
      setIsPlayerOpen(true);
    });
  }, [setIsPlayerOpen]);

  const _playSingleFileAlbum = useCallback(
    (track: AudioFile) => {
      if (_isAlreadyPlaying(track.id())) {
        return resumePlayingFile();
      }

      const queue: AudioFile[] = creator({
        firstId: track.id(),
        files: [track],
        size: 1,
        variant: Setting.get('queuePicking'),
      });
      setTimeout(() => {});
      TrackPlayManager.playNew(queue);
    },
    [_isAlreadyPlaying, resumePlayingFile],
  );

  const _onAlbumPress = useCallback(
    (albums: merged): void => {
      if (Object.keys(albums).length === 1) {
        _playSingleFileAlbum(albums[1]);
        return;
      }

      setModalAlbumFiles(Object.values(albums));
      setShowModal(true);
    },
    [_playSingleFileAlbum],
  );

  const _onModalPlayAll = useCallback((): void => {
    const files: AudioFile[] = modalAlbumFiles;
    if (_isAlreadyPlaying(files[0].id())) {
      return resumePlayingFile();
    }

    const queue: AudioFile[] = creator({
      firstId: files[0].id(),
      files: files,
      size: files.length,
      variant: 'in_order',
    });
    TrackPlayManager.playNew(queue);
  }, [modalAlbumFiles, _isAlreadyPlaying, resumePlayingFile]);

  const onModalPlay = useCallback(
    (file: AudioFile): void => {
      if (_isAlreadyPlaying(file.id())) {
        return resumePlayingFile();
      }

      const queue: AudioFile[] = creator({
        firstId: file.id(),
        files: modalAlbumFiles,
        size: modalAlbumFiles.length,
        variant: 'in_order',
      });
      TrackPlayManager.playNew(queue);
    },
    [modalAlbumFiles, _isAlreadyPlaying, resumePlayingFile],
  );

  const onModalPause = useCallback((_file: AudioFile): void => {
    TrackPlayManager.pause();
    //setModalPlayingFileId(undefined);
  }, []);

  const _onModalRequestClose = useCallback((): void => {
    setShowModal(false);
  }, []);

  return (
    <RootView style={screenStyles.root}>
      <AlbumList
        list={mergedSameAlbums}
        keyExtractor={(albumItems: merged) => albumItems[1].album()}
        onItemPress={(albumItems: merged) => _onAlbumPress(albumItems)}
        itemDescription={(albumItems: merged) => {
          return (
            <DDFText style={styles.text} numberOfLines={1}>
              {albumItems[1].album()}
            </DDFText>
          );
        }}
      />
      <SpecialFilesModal
        isVisible={showModal}
        files={modalAlbumFiles}
        playingFileId={modalPlayingFileId}
        onRequestClose={_onModalRequestClose}
        onPlayAll={_onModalPlayAll}
        onPlay={onModalPlay}
        onPause={onModalPause}
      />
      <PlayerModal
        isOpen={isPlayerOpen}
        info={{
          file: playingFile,
          displayTitle: displayTitle,
          lastSavedPosition: lastSavedPosition,
        }}
      />
    </RootView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 5,
    color: colors.primaryDarkest,
  },
});

export default SpecialAlbumScreen;
