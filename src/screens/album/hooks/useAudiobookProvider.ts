import {useEffect} from 'react';
import AudiobookProvider from 'lib/audiobooks/provider';
import {listTypes} from 'lib/audiobooks/provider/type';
import {setListType} from './types';

const useAudiobookProvider = (
  listType: listTypes,
  setAudiobookList: setListType,
) => {
  useEffect(() => {
    AudiobookProvider.get(listType)
      .then((audiobooks) => {
        setAudiobookList(audiobooks);
      })
      .catch((e) => console.log(e));
  }, [listType, setAudiobookList]);
};

export default useAudiobookProvider;
