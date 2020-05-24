export type GeneralAudioFile = {
  _filePath: string;
  _filename: string;
  _fileType: string;
  _title: string;
  _author: string;
  _album: string;
  _trackNumber: number;
  _base64Image: string;
  _duration: number;
  setImage: (base64Image: string) => void;
  setTrackNumber: (number: number) => void;
  setDuration: (number: number) => void;
  image: () => string;
  filePath: () => string;
  filename: () => string;
  fileType: () => string;
  title: () => string;
  author: () => string;
  album: () => string;
  trackNumber: () => number;
  isNumbered: () => boolean;
  duration: () => number;
};

export type FileIdType = string;

type FileId = {
  id: () => FileIdType;
};
export type AudioFile = GeneralAudioFile & FileId;
