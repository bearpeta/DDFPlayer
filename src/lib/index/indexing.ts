import {readDir} from 'react-native-fs';
import {AudioFile} from 'lib/audiobooks/type';

type buildFunction = (path: string) => Promise<AudioFile>;

const indexing = async (
  path: string,
  buildObjFnc: buildFunction,
): Promise<AudioFile[]> => {
  var readResult;
  try {
    readResult = await readDir(path);
  } catch (e) {
    return Promise.reject(e);
  }

  const results = await Promise.all(
    readResult
      .filter((dirItem) => !dirItem.isDirectory())
      .map((dirItem) => {
        return buildObjFnc(dirItem.path);
      }),
  );

  return results;
};

export default indexing;
