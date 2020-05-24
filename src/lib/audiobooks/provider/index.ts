import indexing from 'lib/index/indexing';
import createFromFilePath from '../create';
import {AudioFile} from '../type';
import {albumList, NUMBERED, SPECIAL, listTypes, list, Provider} from './type';
import Setting from 'lib/setting/Setting';

const fileList: albumList = {
  numbered: {},
  special: {},
};

const _mergeFileLists = async (newFiles: AudioFile[]): Promise<void> => {
  newFiles.forEach((file) => {
    if (file.isNumbered()) {
      // If we already have the file in our list we won't add it again since they won't change often/while the app is running
      if (fileList[NUMBERED].hasOwnProperty(file.id())) {
        return;
      }
      fileList[NUMBERED][file.id()] = file;
      return;
    }

    // If we already have the file in our list we won't add it again since they won't change often/while the app is running
    if (fileList[SPECIAL].hasOwnProperty(file.id())) {
      return;
    }
    fileList[SPECIAL][file.id()] = file;
    return;
  });
};

const _setup = async (): Promise<Provider> => {
  const newFiles = await indexing(
    Setting.get('folderPath'),
    createFromFilePath,
  );
  //console.log(`PROVIDER SETUP/REFRESH: ${newFiles}`);
  await _mergeFileLists(newFiles);
  return AudiobookProvider;
};

const _getAudiobooks = async (type: listTypes): Promise<list> => {
  if (Object.keys(fileList[type]).length > 0) {
    //console.log('GET: HAS ALREADY FILES!');
    return fileList[type];
  }
  //console.log('GET: NO FILES YET. TRY INDEXING');
  const newFiles = await indexing(
    Setting.get('folderPath'),
    createFromFilePath,
  );
  await _mergeFileLists(newFiles);
  return fileList[type];
};

const _getById = (id: string): AudioFile | null => {
  for (const listType of Object.keys(fileList)) {
    const listKeys = Object.keys(fileList[listType as listTypes]);
    const foundKey = listKeys.find((key) => key === id);
    if (foundKey) {
      return fileList[listType as listTypes][foundKey];
    }
  }

  return null;
};

const AudiobookProvider: Provider = {
  setup: _setup,
  refresh: _setup, // Refresh does the same as setup at the end as by now.
  get: _getAudiobooks,
  getNumbered: async () => _getAudiobooks(NUMBERED),
  getSpecial: async () => _getAudiobooks(SPECIAL),
  getById: _getById,
};

export default AudiobookProvider;
