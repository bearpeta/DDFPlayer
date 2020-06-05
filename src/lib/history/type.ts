export type HistoryEntry = {id: string; date: string};

export type History = {
  [key: string]: HistoryEntry[];
};
