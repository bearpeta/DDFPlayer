import React, {useCallback, useState, useMemo} from 'react';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import {AudioFile} from 'lib/audiobooks/type';
import PlayerModal from 'lib/player/PlayerModal';
import Setting from 'lib/setting/Setting';
import {STATES} from 'lib/trackplaymanager/states';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import RootView from 'lib/view/RootView';
import HeaderRightView from 'navigation/HeaderRightView';
import AlbumList from 'screens/album/list/AlbumList';
import creator from 'screens/album/queue/creator';
import {screenStyles} from 'screens/album/styles';
import useAlbumPlayer from './hooks/useAlbumPlayer';
import NumListAlbumDesc from './num_album/NumListAlbumDesc';

type sorting = 'desc' | 'asc';

const NumbAlbumScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [sortType, setSortType] = useState<sorting>('asc');

  const [
    audiobookList,
    isPlayerOpen,
    playingFile,
    displayTitle,
    lastSavedPosition,
    setIsPlayerOpen,
  ] = useAlbumPlayer('numbered');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useFocusEffect(
    React.useCallback(() => {
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
    }, [sortType, navigation]),
  );

  const _onAlbumPress = useCallback(
    (album: AudioFile): void => {
      if (playingFile !== undefined && album.id() === playingFile!.id()) {
        TrackPlayManager.getState().then((state) => {
          if (state !== STATES.PLAYING) {
            TrackPlayManager.resume();
          }
          setIsPlayerOpen(true);
        });
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
    [playingFile, audiobookList, setIsPlayerOpen],
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
        info={{
          file: playingFile,
          displayTitle: displayTitle,
          lastSavedPosition: lastSavedPosition,
        }}
      />
    </RootView>
  );
};

export default NumbAlbumScreen;
