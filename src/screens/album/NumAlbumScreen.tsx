import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import PlayerModal from 'lib/player/PlayerModal';
import AlbumList from 'screens/album/list/AlbumList';
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
    playingFile,
    displayTitle,
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
              onHistoryPress={() => navigation.navigate('HistoryScreen')}
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
    },
    [playingFile, audiobookList],
  );

  const sortedList = useMemo(() => {
    return Object.values(audiobookList).sort((fileA, fileB) => {
      if (sortType === 'desc') {
        return fileB.trackNumber() - fileA.trackNumber();
      }
      return fileA.trackNumber() - fileB.trackNumber();
    });
  }, [audiobookList, sortType]);

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
        displayTitle={displayTitle}
      />
    </RootView>
  );
};

export default NumbAlbumScreen;
