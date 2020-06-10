import {useCallback, useEffect} from 'react';
import {convertFromTrackPlayer} from 'lib/audiobooks/convert';
import {getCurrentPosition} from 'lib/audiobooks/currentProgress';
import {AudioFile} from 'lib/audiobooks/type';
import Setting from 'lib/setting/Setting';
import {getLastPlayedFile} from 'lib/trackplaymanager/lastPlayed';
import {STATES} from 'lib/trackplaymanager/states';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import creator from '../queue/creator';
import {FileList} from '../type';
import {
  setIsPlayerOpenType,
  setPlayingFileType,
  setCurrentPositionType,
} from './types';

// This hook tries to set the current playing file and the open state of the player by checking
// if there is a file playing or if there is a last played file set.
const useLastPlayedFile = (
  audiobookList: FileList,
  setIsPlayerOpen: setIsPlayerOpenType,
  setPlayingFile: setPlayingFileType,
  setCurrentPosition: setCurrentPositionType,
) => {
  const createDefaultQueue = useCallback(
    (file: AudioFile): AudioFile[] => {
      // the last played file should just be used by the view if it is of the same type ('numbered' | 'special)
      const isSameType: number = Object.keys(audiobookList).findIndex(
        (id: string) => id === file.id(),
      );

      if (isSameType === -1) {
        return [];
      }

      const queue: AudioFile[] = creator({
        firstId: file.id(),
        files: Object.values(audiobookList),
        size: Setting.get('queueSize'),
        variant: Setting.get('queuePicking'),
      });
      return queue;
    },
    [audiobookList],
  );

  const usingLastPlayed = useCallback(async (): Promise<void> => {
    const file: AudioFile | null = await getLastPlayedFile();
    if (file === null) return;
    const queue = createDefaultQueue(file);
    if (queue.length < 1) return;
    TrackPlayManager.addQueue({files: queue, replace: true});

    setIsPlayerOpen(true);
    setPlayingFile(file);
    // If there is no playing file and I load the last played one, it makes sense to jump also to the last known position.eee
    getCurrentPosition(file).then((position: number) => {
      TrackPlayManager.seekTo(position);
      setCurrentPosition(position);
    });
  }, [createDefaultQueue, setIsPlayerOpen, setPlayingFile, setCurrentPosition]);

  useEffect(() => {
    TrackPlayManager.getState().then((state) => {
      if (state !== STATES.PLAYING) {
        usingLastPlayed();
        return;
      }

      TrackPlayManager.getCurrentTrack().then((id) => {
        if (id === null) return;
        TrackPlayManager.getTrack(id).then((track) => {
          if (track === null) return;
          convertFromTrackPlayer(track).then((file) => {
            setIsPlayerOpen(true);
            setPlayingFile(file);
          });
        });
      });
    });
  }, [usingLastPlayed, setIsPlayerOpen, setPlayingFile, setCurrentPosition]);
};

export default useLastPlayedFile;
