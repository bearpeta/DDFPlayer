import {AudioFile, FileIdType} from 'lib/audiobooks/type';
import {queuePickingType} from 'lib/setting/types';

type createOptions = {
  files: AudioFile[];
  variant: queuePickingType;
  size: number; // Define how many tracks should be add to the queue
  firstId?: FileIdType; // If defined the file with the given ID will be on the first place in the queue
};

const creator = (options: createOptions): AudioFile[] => {
  const queue: AudioFile[] = [];
  const files = options.files;

  if (files.length < 1) {
    return [];
  }

  if (options.variant === 'random') {
    if (options.firstId !== undefined) {
      const idx = files.findIndex((file) => file.id() === options.firstId);
      if (idx !== -1) {
        queue.push(files[idx]);
      }
    }
    return _addRandom(queue, files, options.size);
  }

  // VARIANT: 'IN_ORDER'
  let firstIndex: number = -1;
  if (options.firstId !== undefined) {
    firstIndex = files.findIndex((file) => file.id() === options.firstId);
  }

  // if firstId isn't set or couldn't be found in the given list we take a random id to start and follow from there
  if (options.firstId === undefined || firstIndex === -1) {
    firstIndex = _getRandomNumber(files.length);
  }

  const addingIndexes: number[] = [...Array(options.size).keys()].map(
    (i) => i + firstIndex,
  );

  for (let idx of addingIndexes) {
    if (idx >= files.length) {
      // if we reached the end of the list and the 'variant' is 'in_order' we stop adding more files.
      if (options.variant === 'in_order') break;

      // with variant='in_order_repeat' we reset the index and start from the beginning of the list
      idx = idx - files.length;
    }
    queue.push(files[idx]);
  }
  return queue;
};

const _addRandom = (
  queue: AudioFile[],
  audiobookList: AudioFile[],
  size: number,
): AudioFile[] => {
  const alreadyInQueue = (id: string | number): boolean => {
    return queue.findIndex((file) => file.id() === id) !== -1;
  };

  while (queue.length < size) {
    const audioFile = audiobookList[_getRandomNumber(audiobookList.length) - 1];
    if (alreadyInQueue(audioFile.id())) {
      continue;
    }

    queue.push(audioFile);
  }

  return queue;
};

const _getRandomNumber = (max: number): number => {
  const min = Math.ceil(1);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default creator;
