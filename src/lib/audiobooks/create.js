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
  return initiate(filePath, album, title);
};

const initiate = (filePath, album, title) => {
  const parts = title.split(' - ');
  if (!isNaN(parts[0])) {
    return new NumberedAudiobook(
      filePath,
      album,
      title,
      parseInt(parts[0], 10),
    );
  }
  return new SpecialAudiobook(filePath, album, title);
};

const create = async filePath => {
  let meta;
  try {
    meta = await MediaMeta.get(filePath);
    const album = initiate(filePath, meta.album, meta.title);

    if (meta.thumb) {
      album.setImage(meta.thumb);
    }

    return album;
  } catch (e) {
    console.error(e);
    return _createFromFilePath(filePath);
  }
};

export default create;
export {initiate};
