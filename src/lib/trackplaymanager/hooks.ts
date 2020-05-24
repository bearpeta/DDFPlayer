import {
  // @ts-ignore
  useTrackPlayerEvents,
  // @ts-ignore
  useTrackPlayerProgress,
} from 'react-native-track-player';

const usePlayerEvents = (events: any, listener: any) => {
  useTrackPlayerEvents(events, listener);
};

const usePlayerProgress = (intervalInSec = 1000) => {
  return useTrackPlayerProgress(intervalInSec);
};

export {usePlayerEvents, usePlayerProgress};
