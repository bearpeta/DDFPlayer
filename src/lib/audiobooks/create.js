import MediaMeta from 'react-native-media-meta';
import {NumberedAudiobook, SpecialAudiobook} from './audiobook';

const _createFromFilePath = filePath => {
  const filename = filePath.substr(filePath.lastIndexOf('/') + 1);
  const filenameParts = filename.split('.');
  const title = filenameParts[0];
  //const extension = filenameParts[1];

  const parts = title.split(' - ');

  // Every filename should have at least three parts (more are possible with special albums)
  // 1. Album number|"Special"
  // 2. "Die Drei ???"
  // 3. album title
  if (parts.length < 3) {
    console.log(`FILENAME WRONG FORMATTED: ${parts}`);
  }
  var album = parts[parts.length - 1];

  const number = getAlbumNumber(album);
  if (number !== '') {
    return new NumberedAudiobook(filePath, album, title, number);
  }
  return new SpecialAudiobook(filePath, album, title);
};

const getAlbumNumber = albumTitle => {
  const parts = albumTitle.split(' - ');
  return !isNaN(parts[0]) ? parseInt(parts[0], 10) : '';
};

const create = async filePath => {
  let meta;
  try {
    meta = await MediaMeta.get(filePath);

    let albumObj = null;

    const number = getAlbumNumber(meta.title);
    if (number === '') {
      albumObj = new SpecialAudiobook(filePath, meta.album, meta.title);
    } else {
      albumObj = new NumberedAudiobook(
        filePath,
        meta.album,
        meta.title,
        number,
      );
    }

    if (meta.thumb) {
      albumObj.setImage(meta.thumb);
    }

    return albumObj;
  } catch (e) {
    console.error(e);
    return _createFromFilePath(filePath);
  }
};

export default create;
