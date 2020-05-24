import {useCallback, useEffect} from 'react';
import {AudioFile} from 'lib/audiobooks/type';
import {getLastPlayedFile} from 'lib/trackplaymanager/lastPlayed';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import {setIsPlayerOpenType, setPlayingFileType} from './types';
import {STATES} from 'lib/trackplaymanager/states';
import {convertFromTrackPlayer} from 'lib/audiobooks/convert';
import {FileList} from '../type';
import creator from '../queue/creator';
import Setting from 'lib/setting/Setting';

// This hook tries to set the current playing file and the open state of the player by checking
// if there is a file playing or if there is a last played file set.
const useLastPlayedFile = (
  audiobookList: FileList,
  setIsPlayerOpen: setIsPlayerOpenType,
  setPlayingFile: setPlayingFileType,
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
  }, [createDefaultQueue, setIsPlayerOpen, setPlayingFile]);

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
  }, [usingLastPlayed, setIsPlayerOpen, setPlayingFile]);
};

export default useLastPlayedFile;
