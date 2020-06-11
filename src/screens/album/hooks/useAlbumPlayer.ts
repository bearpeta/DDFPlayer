import {useState, useRef, useEffect} from 'react';
import {getCurrentPosition} from 'lib/audiobooks/currentProgress';
import {listTypes} from 'lib/audiobooks/provider/type';
import {AudioFile} from 'lib/audiobooks/type';
import Setting from 'lib/setting/Setting';
import {getLastPlayedFile} from 'lib/trackplaymanager/lastPlayed';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import creator from '../queue/creator';
import {FileList} from '../type';
import {setIsPlayerOpenType, setListType} from './types';
import useAudiobookProvider from './useAudiobookProvider';
import useDisplayTitle from './useDisplayTitle';
import useEventListeners from './useEventListener';
import useHistory from './useHistory';

type returnType = [
  FileList,
  boolean,
  AudioFile | undefined,
  string,
  number,
  setIsPlayerOpenType,
  setListType,
];

const useAlbumPlayer = (listType: listTypes): returnType => {
  // Normally lastSavedPosition is always 0 since I want to let the choice to the user if they want to jump to a last known position.
  // But when the app gets started and the app loads the last played file with the last known position I want a different behavior.
  // The variable previousFile just helps to determine if the app just was started and the playingFile = LastPlayedFile
  const previousFile = useRef<AudioFile | undefined>(undefined);
  const [audiobookList, setAudiobookList] = useState<FileList>({});
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [playingFile, setPlayingFile] = useState<AudioFile | undefined>(
    undefined,
  );
  const [displayTitle, setDisplayTitle] = useState<string>('');
  // lastSavedPosition will always be 0 unless when the app starts and there is a last played file.
  const [lastSavedPosition, setLastSavedPosition] = useState(0);

  // Used when the app starts to load the last played file
  useEffect(() => {
    if (previousFile.current !== undefined) return;

    getLastPlayedFile().then((file) => {
      if (file === null) return;

      // the last played file should just be used by the view if it is of the same type ('numbered' | 'special)
      const isSameType: number = Object.keys(audiobookList).findIndex(
        (id: string) => id === file.id(),
      );

      if (isSameType === -1) {
        return;
      }

      const queue: AudioFile[] = creator({
        firstId: file.id(),
        files: Object.values(audiobookList),
        size: Setting.get('queueSize'),
        variant: Setting.get('queuePicking'),
      });

      if (queue.length < 1) return;
      TrackPlayManager.addQueue({files: queue, replace: true});

      setIsPlayerOpen(true);
      setPlayingFile(file);
      // If there is no playing file and I load the last played one, it makes sense to jump also to the last known position.eee
      getCurrentPosition(file).then((position: number) => {
        TrackPlayManager.seekTo(position);
        setLastSavedPosition(position);
      });
    });
  }, [audiobookList]);

  useEffect(() => {
    if (playingFile === undefined) return;

    // if previousFile is not undefined it means the new 'playingFile' is not the 'LastPlayedFile' and in this case the position is 0 by default.
    if (previousFile.current !== undefined) {
      setLastSavedPosition(0);
    }

    previousFile.current = playingFile;
  }, [playingFile]);

  useDisplayTitle(playingFile, setDisplayTitle);

  useEventListeners({
    keepPlayerOpen: setIsPlayerOpen,
    trackChange: setPlayingFile,
  });

  useAudiobookProvider(listType, setAudiobookList);

  useHistory(listType);

  return [
    audiobookList,
    isPlayerOpen,
    playingFile,
    displayTitle,
    lastSavedPosition,
    setIsPlayerOpen,
    setAudiobookList,
  ];
};

export default useAlbumPlayer;
