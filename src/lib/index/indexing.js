import {readDir} from 'react-native-fs';

const indexing = async (path, buildObjFnc) => {
  var readResult;
  try {
    readResult = await readDir(path);
  } catch (e) {
    return new Promise.reject(e);
  }

  const results = await Promise.all(
    readResult
      .filter(dirItem => !dirItem.isDirectory())
      .map(dirItem => {
        return buildObjFnc(dirItem.path);
      }),
  );

  return results;
};

export default indexing;
