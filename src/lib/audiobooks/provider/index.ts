import indexing from 'lib/index/indexing';
import Setting from 'lib/setting/Setting';
import createFromFilePath from '../create';
import {AudioFile} from '../type';
import {getAllFiles, saveFiles} from './storage';
import {albumList, NUMBERED, SPECIAL, listTypes, list, Provider} from './type';

const fileList: albumList = {
  numbered: {},
  special: {},
};

const _mergeFileLists = (newFiles: AudioFile[]): void => {
  newFiles.forEach((file) => {
    if (file.isNumbered()) {
      fileList[NUMBERED][file.id()] = file;
      return;
    }
    fileList[SPECIAL][file.id()] = file;
  });
};

const _setup = async (): Promise<Provider> => {
  const existingFiles = await getAllFiles();
  if (existingFiles.length < 1) {
    return _refresh();
  }

  _mergeFileLists(existingFiles);
  return AudiobookProvider;
};

const _refresh = async (): Promise<Provider> => {
  const newFiles = await indexing(
    Setting.get('folderPath'),
    createFromFilePath,
  );
  _mergeFileLists(newFiles);
  await saveFiles(newFiles);
  return AudiobookProvider;
};

const _getAudiobooks = async (type: listTypes): Promise<list> => {
  if (Object.keys(fileList[type]).length > 0) {
    return fileList[type];
  }

  await _refresh();
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
  refresh: _refresh, // Refresh does the same as setup at the end as by now.
  get: _getAudiobooks,
  getById: _getById,
};

export default AudiobookProvider;
