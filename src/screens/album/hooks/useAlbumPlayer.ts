import {useState} from 'react';
import {FileList} from '../type';
import {AudioFile} from 'lib/audiobooks/type';
import {listTypes} from 'lib/audiobooks/provider/type';
import useAudiobookProvider from './useAudiobookProvider';
import useLastPlayedFile from './useLastPlayedFile';
import useEventListeners from './useEventListener';

type returnType = [
  FileList,
  boolean,
  (t: boolean) => void,
  AudioFile | undefined,
  (t: AudioFile | undefined) => void,
];

const useAlbumPlayer = (listType: listTypes): returnType => {
  const [audiobookList, setAudiobookList] = useState<FileList>({});
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [playingFile, setPlayingFile] = useState<AudioFile | undefined>(
    undefined,
  );

  useEventListeners(setIsPlayerOpen);
  useAudiobookProvider(listType, setAudiobookList);
  useLastPlayedFile(audiobookList, setIsPlayerOpen, setPlayingFile);

  return [
    audiobookList,
    isPlayerOpen,
    setIsPlayerOpen,
    playingFile,
    setPlayingFile,
  ];
};

export default useAlbumPlayer;
