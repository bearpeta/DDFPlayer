import {readDir} from 'react-native-fs';

const indexing = async (path, buildObjFnc) => {
  var readResult;
  try {
    readResult = await readDir(path);
  } catch (e) {
    return new Promise.reject(e);
  }
  const list = [];
  readResult.forEach(dirItem => {
    if (dirItem.isDirectory()) {
      // TODO: Right now we don't expect folders in here. Changes when Special books are added
      return;
    }
    list.push(buildObjFnc(dirItem.path));
  });

  return list;
};

export default indexing;
