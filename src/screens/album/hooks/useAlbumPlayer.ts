import {useState} from 'react';
import {FileList} from '../type';
import {AudioFile} from 'lib/audiobooks/type';
import {listTypes} from 'lib/audiobooks/provider/type';
import useAudiobookProvider from './useAudiobookProvider';
import useLastPlayedFile from './useLastPlayedFile';
import useEventListeners from './useEventListener';
import useDisplayTitle from './useDisplayTitle';
import useHistory from './useHistory';

type returnType = [FileList, boolean, AudioFile | undefined, string];

const useAlbumPlayer = (listType: listTypes): returnType => {
  const [audiobookList, setAudiobookList] = useState<FileList>({});
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [playingFile, setPlayingFile] = useState<AudioFile | undefined>(
    undefined,
  );
  const [displayTitle, setDisplayTitle] = useState<string>('');

  useDisplayTitle(playingFile, setDisplayTitle);

  useEventListeners({
    keepPlayerOpen: setIsPlayerOpen,
    trackChange: setPlayingFile,
  });
  useAudiobookProvider(listType, setAudiobookList);
  useLastPlayedFile(audiobookList, setIsPlayerOpen, setPlayingFile);
  useHistory(listType);

  return [audiobookList, isPlayerOpen, playingFile, displayTitle];
};

export default useAlbumPlayer;
