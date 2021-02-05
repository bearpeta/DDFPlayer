import {readDir} from 'react-native-fs';
import {AudioFile} from 'lib/audiobooks/type';

type buildFunction = (path: string) => Promise<AudioFile>;

const indexing = async (
  path: string,
  buildObjFnc: buildFunction,
): Promise<AudioFile[]> => {
  let readResult;
  try {
    readResult = await readDir(path);
  } catch (e) {
    return Promise.reject(e);
  }

  return await Promise.all(
    readResult
      .filter((dirItem) => !dirItem.isDirectory())
      .map((dirItem) => {
        return buildObjFnc(dirItem.path);
      }),
  );
};

export default indexing;
