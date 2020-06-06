import {FileList} from '../type';
import {AudioFile} from 'lib/audiobooks/type';

export type setIsPlayerOpenType = (setIsPlayerOpen: boolean) => void;
export type setListType = (list: FileList) => void;
export type setPlayingFileType = (file: AudioFile) => void;
export type setDisplayTitleType = (title: string) => void;
export type setCurrentPositionType = (position: number) => void;
