import {AudioFile} from 'lib/audiobooks/type';

export type FileList = {
  [key: string]: AudioFile;
};

export type AlbumScreenProps = {};

export type AlbumScreenState = {
  audiobookList: FileList;
  isPlayerModalOpen: boolean;
  playingFile: AudioFile | undefined;
};
