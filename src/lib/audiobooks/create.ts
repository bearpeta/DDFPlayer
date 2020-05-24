//@ts-ignore
import MediaMeta from 'react-native-media-meta';
import {AudioFile, GeneralAudioFile} from './type';

// if numbered album: trackName = album
type metaFromFilename = {album: string; trackName: string; trackNumber: number};

const createFromFilePath = async (filePath: string): Promise<AudioFile> => {
  let meta: {
    album: string;
    title: string;
    thumb: string;
    duration: string;
    track: string;
  };

  const file: GeneralAudioFile = _createGeneralFile(filePath, '', '');
  const filenameMeta: metaFromFilename = _getMetaFromFilename(file.filename());

  file._album = filenameMeta.album;
  file._title = filenameMeta.trackName;
  file._trackNumber = filenameMeta.trackNumber;

  try {
    meta = await MediaMeta.get(filePath);
    if (meta.thumb) {
      file.setImage(meta.thumb);
    }

    if (meta.duration) {
      const durationMs = parseInt(meta.duration, 10);
      file.setDuration(durationMs / 1000); // We want the duration in seconds
    }

    // in case the filename wasn't formatted as expected we will use the meta information
    if (file.title() === '' && meta.title) {
      file._title = meta.title;
    }

    if (file.album() === '' && meta.album) {
      file._album = meta.album;
    }

    if (file.trackNumber() < 1 && meta.track) {
      file.setTrackNumber(parseInt(meta.track, 10));
    }
  } catch (e) {
    console.error(e);
  } finally {
    return _setId(file);
  }
};

const _setId = (file: GeneralAudioFile): AudioFile => {
  if (file.isNumbered()) {
    return {
      id: () => file.trackNumber().toString(),
      ...file,
    };
  }

  return {
    id: () => file.filePath(),
    ...file,
  };
};

const _getMetaFromFilename = (filename: string): metaFromFilename => {
  const parts = filename.split(' - ');
  // Every filename should have at least three parts (more are possible with special albums)
  // 1. track number |"Special"
  // 2. "Die Drei ???"
  // 3. album title
  // 4. track number | track name (optional)
  // 5. track name (optional, just if there is a track number in the filename)
  if (parts.length < 3 || parts.length > 5) {
    console.log(`FILENAME WRONG FORMATTED: ${parts}`);
    return {album: '', trackName: '', trackNumber: 0};
  }

  const album = parts[2];
  let trackName = parts[2];
  let trackNumber = 0;

  // if the firstPart really is a number it means that it is a numbered audiobook and we will use it as trackNumber
  const firstPart: number = _getFirstPartAsNumber(filename);
  if (parts.length === 3 && !isNaN(firstPart)) {
    trackNumber = firstPart;
    return {album, trackName, trackNumber};
  }

  // files with 4 parts are standalone special audiobooks
  if (parts.length === 4) {
    trackName = parts[3];
    return {album, trackName, trackNumber};
  }

  // files with 5 parts are part of a special audiobook series
  if (parts.length === 5) {
    trackName = parts[4];
    trackNumber = parseInt(parts[3], 10);
  }
  return {album, trackName, trackNumber};
};

const _createGeneralFile = (
  filePath: string,
  album: string,
  title: string,
): GeneralAudioFile => {
  const {filename, extension} = _extractFullFilename(filePath);

  return {
    _filePath: filePath,
    _filename: filename,
    _fileType: extension,
    _title: title,
    _author: 'Die Drei Fragezeichen',
    _album: album,
    _trackNumber: 1,
    _duration: 0,
    _base64Image: '',
    setImage: function (base64Image: string) {
      if (!base64Image.startsWith('data:image')) {
        base64Image = `data:image/jpeg;base64,${base64Image}`;
      }
      this._base64Image = base64Image;
    },
    setTrackNumber: function (trackNumber: number) {
      if (isNaN(trackNumber)) return;
      this._trackNumber = trackNumber;
    },
    setDuration: function (duration: number) {
      if (isNaN(duration)) return;
      this._duration = duration;
    },
    image: function () {
      return this._base64Image;
    },
    filePath: function () {
      return this._filePath;
    },
    filename: function () {
      return this._filename;
    },
    fileType: function () {
      return this._fileType;
    },
    title: function () {
      return this._title;
    },
    author: function () {
      return this._author;
    },
    album: function () {
      return this._album;
    },
    trackNumber: function () {
      return this._trackNumber;
    },
    duration: function () {
      return this._duration;
    },
    isNumbered: function () {
      return _isNumbered(this._filename);
    },
  };
};

const _extractFullFilename = (
  filePath: string,
): {filename: string; extension: string} => {
  const fileString = filePath.substr(filePath.lastIndexOf('/') + 1);
  const fileStringParts = fileString.split('.');
  const filename = fileStringParts[0];
  const extension = fileStringParts[1];

  return {filename, extension};
};

const _getFirstPartAsNumber = (filename: string): number => {
  const parts = filename.split(' - ');
  return parseInt(parts[0], 10);
};

const _isNumbered = (filename: string) => {
  return !isNaN(_getFirstPartAsNumber(filename));
};

export default createFromFilePath;
