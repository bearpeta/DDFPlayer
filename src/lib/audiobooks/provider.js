import {ExternalStorageDirectoryPath} from 'react-native-fs';
import create from './create';
import indexing from 'lib/index/indexing';

const AUDIOFILE_ROOT_PATH = `${ExternalStorageDirectoryPath}/Music/DDF/`;

const NUMBERED = 'numbered';
const SPECIAL = 'special';

var fileList = {
  [NUMBERED]: {},
  [SPECIAL]: {},
};

const _mergeFileLists = async newFiles => {
  var isSetupAlready =
    Object.keys(fileList[NUMBERED]).length !== 0 ||
    Object.keys(fileList[SPECIAL]).length !== 0;

  newFiles.forEach(file => {
    const isNumbered = file.hasOwnProperty('_number');

    // Is the case when the app gets started and the files aren't loaded yet for the first time
    if (!isSetupAlready) {
      //console.log('MERGE: NO SETUP YET. STARTING NOW');
      if (isNumbered) {
        fileList[NUMBERED][file.audiobookNumber()] = file;
        return;
      }
      fileList[SPECIAL][file.title()] = file;
      return;
    }
    //console.log('MERGE: SETUP ALREADY HAPPENED');

    if (isNumbered) {
      // If we already have the file in our list we won't add it again since they won't change often/while the app is running
      if (fileList[NUMBERED].hasOwnProperty(file.audiobookNumber())) {
        return;
      }
      fileList[NUMBERED][file.audiobookNumber()] = file;
      return;
    }

    // If we already have the file in our list we won't add it again since they won't change often/while the app is running
    if (fileList[SPECIAL].hasOwnProperty(file.title())) {
      return;
    }
    fileList[SPECIAL][file.titles()] = file;
    return;
  });
};

const _setup = async () => {
  const newFiles = await indexing(AUDIOFILE_ROOT_PATH, create);
  //console.log(`PROVIDER SETUP/REFRESH: ${newFiles}`);
  await _mergeFileLists(newFiles);
  return AudiobookProvider;
};

const _getAudiobooks = async type => {
  const idxPromise = indexing(AUDIOFILE_ROOT_PATH, create);
  if (Object.keys(fileList[type]).length > 0) {
    //console.log('GET: HAS ALREADY FILES!');
    idxPromise.then(list => {
      _mergeFileLists(list);
    });
    return fileList[type];
  }
  //console.log('GET: NO FILES YET. TRY INDEXING');

  const newFiles = await idxPromise;
  await _mergeFileLists(newFiles);
  return fileList[type];
};

const AudiobookProvider = {
  setup: _setup,
  refresh: _setup, // Refresh does the same as setup at the end as by now.
  getNumbered: async () => _getAudiobooks(NUMBERED),
  getSpecial: async () => _getAudiobooks(SPECIAL),
};

export default AudiobookProvider;
