import AudiobookProvider from 'lib/audiobooks/provider';
import {listTypes} from 'lib/audiobooks/provider/type';
import {setListType} from './hooks/types';

const refreshList = async (
  type: listTypes,
  setList: setListType,
): Promise<void> => {
  const provider = await AudiobookProvider.refresh();
  const newList = await provider.get(type);
  setList(newList);
};

export default refreshList;
