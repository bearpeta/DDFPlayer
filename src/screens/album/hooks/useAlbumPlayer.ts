import {useState, useRef, useEffect} from 'react';
import {FileList} from '../type';
import {AudioFile} from 'lib/audiobooks/type';
import {listTypes} from 'lib/audiobooks/provider/type';
import useAudiobookProvider from './useAudiobookProvider';
import useLastPlayedFile from './useLastPlayedFile';
import useEventListeners from './useEventListener';
import useDisplayTitle from './useDisplayTitle';
import useHistory from './useHistory';

type returnType = [FileList, boolean, AudioFile | undefined, string, number];

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
  useLastPlayedFile(
    audiobookList,
    setIsPlayerOpen,
    setPlayingFile,
    setLastSavedPosition,
  );
  useHistory(listType);

  return [
    audiobookList,
    isPlayerOpen,
    playingFile,
    displayTitle,
    lastSavedPosition,
  ];
};

export default useAlbumPlayer;
