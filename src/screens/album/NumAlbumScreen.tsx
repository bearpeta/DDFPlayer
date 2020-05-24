import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import PlayerModal from 'lib/player/PlayerModal';
import AlbumList from 'lib/view/AlbumList';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import {AudioFile} from 'lib/audiobooks/type';
import creator from 'screens/album/queue/creator';
import RootView from 'lib/view/RootView';
import {screenStyles} from 'screens/album/styles';
import useAlbumPlayer from './hooks/useAlbumPlayer';
import HeaderRightView from 'navigation/HeaderRightView';
import NumListAlbumDesc from './num_album/NumListAlbumDesc';
import Setting from 'lib/setting/Setting';

type sorting = 'desc' | 'asc';

const NumbAlbumScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [sortType, setSortType] = useState<sorting>('asc');

  const [
    audiobookList,
    isPlayerOpen,
    setIsPlayerOpen,
    playingFile,
    setPlayingFile,
  ] = useAlbumPlayer('numbered');

  useEffect(() => {
    navigation.addListener('focus', () => {
      navigation.dangerouslyGetParent()!.setOptions({
        headerRight: () => {
          return (
            <HeaderRightView
              onSortPress={() => {
                const sort: sorting = sortType === 'asc' ? 'desc' : 'asc';
                setSortType(sort);
              }}
              onSettingPress={() => {
                navigation.navigate('SettingScreen');
              }}
            />
          );
        },
      });
    });
  }, [navigation, sortType]);

  const _onAlbumPress = useCallback(
    (album: AudioFile): void => {
      if (playingFile !== undefined && album.id() === playingFile!.id()) {
        return;
      }

      const queue: AudioFile[] = creator({
        firstId: album.id(),
        files: Object.values(audiobookList),
        size: Setting.get('queueSize'),
        variant: Setting.get('queuePicking'),
      });
      TrackPlayManager.playNew(queue);
      setIsPlayerOpen(true);
      setPlayingFile(album);
    },
    [playingFile, audiobookList, setIsPlayerOpen, setPlayingFile],
  );

  const sortedList = useMemo(() => {
    return Object.values(audiobookList).sort((fileA, fileB) => {
      if (sortType === 'desc') {
        return fileB.trackNumber() - fileA.trackNumber();
      }
      return fileA.trackNumber() - fileB.trackNumber();
    });
  }, [audiobookList, sortType]);

  if (playingFile) {
    console.log(`${playingFile.trackNumber()} - ${playingFile.title()}`);
  }
  return (
    <RootView style={screenStyles.root}>
      <AlbumList
        list={sortedList}
        keyExtractor={(item: AudioFile) => item.id()}
        onItemPress={(albumItem: AudioFile) => _onAlbumPress(albumItem)}
        itemDescription={(albumItem: AudioFile) => (
          <NumListAlbumDesc albumItem={albumItem} />
        )}
      />
      <PlayerModal
        isOpen={isPlayerOpen}
        file={playingFile}
        displayTitle={
          playingFile
            ? `${playingFile.trackNumber()} - ${playingFile.title()}`
            : ''
        }
      />
    </RootView>
  );
};

export default NumbAlbumScreen;
