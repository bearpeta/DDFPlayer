import Realm from 'realm';
import {createGeneralFile} from '../../create';
import {AudioFile} from '../../type';

const schemaName = 'AudioFile';

const AudioFileSchema = {
  name: schemaName,
  primaryKey: 'id',
  properties: {
    id: 'string',
    filePath: 'string',
    filename: 'string',
    fileType: {type: 'string', default: 'mp3'},
    title: 'string',
    author: {type: 'string', default: 'Die Drei Fragezeichen'},
    album: 'string',
    trackNumber: {type: 'int', default: 1},
    image: 'string',
    duration: {type: 'int', default: 0},
  },
};

const saveFiles = async (files: AudioFile[]) => {
  const realm = await Realm.open({schema: [AudioFileSchema]});
  realm.write(() => {
    files.forEach((file) => {
      const foundFile = realm.objectForPrimaryKey(schemaName, file.id());
      if (foundFile) {
        // @ts-ignore according to the doc that's how you have to do it but Typescript throws an error even though it works.
        realm.create(schemaName, _transToSchema(file), 'modified');
        return;
      }
      realm.create(schemaName, _transToSchema(file));
    });
  });
  realm.close();
};

const getAllFiles = async (): Promise<AudioFile[]> => {
  const files: AudioFile[] = [];
  const realm = await Realm.open({schema: [AudioFileSchema]});
  const result = realm.objects(schemaName);
  result.forEach((obj) => {
    files.push(_transToAudioFile(obj));
  });

  return files;
};

const _transToAudioFile = (realmObj: any): AudioFile => {
  const generalFile = createGeneralFile(
    realmObj.filePath,
    realmObj.album,
    realmObj.title,
  );

  generalFile.setImage(realmObj.image);
  generalFile.setDuration(realmObj.duration);
  generalFile.setTrackNumber(realmObj.trackNumber);

  return {
    id: () => realmObj.id,
    ...generalFile,
  };
};

const _transToSchema = (file: AudioFile) => {
  return {
    id: file.id(),
    filePath: file.filePath(),
    filename: file.filename(),
    fileType: file.fileType(),
    title: file.title(),
    album: file.album(),
    trackNumber: file.trackNumber(),
    image: file.image(),
    duration: file.duration(),
  };
};

export {saveFiles, getAllFiles};
