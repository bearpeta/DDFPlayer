import {AudioFile} from '../type';

export type listTypes = 'numbered' | 'special';

const NUMBERED: listTypes = 'numbered';
const SPECIAL: listTypes = 'special';

export type list = {
  [key: string]: AudioFile;
};

export type albumList = {
  [NUMBERED]: list;
  [SPECIAL]: list;
};

export type Provider = {
  setup: () => Promise<Provider>;
  refresh: () => Promise<Provider>;
  get: (type: listTypes) => Promise<list>;
  getById: (id: string) => AudioFile | null;
};

export {NUMBERED, SPECIAL};
