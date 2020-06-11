import {useCallback, useRef} from 'react';
import {convertFromTrackPlayer} from 'lib/audiobooks/convert';
import {EVENTS} from 'lib/trackplaymanager/events';
import TrackPlayManager, {
  usePlayerEvents,
} from 'lib/trackplaymanager/TrackPlayManager';
import {setPlayingFileType, setIsPlayerOpenType} from './types';

type listeners = {
  trackChange: setPlayingFileType;
  keepPlayerOpen: setIsPlayerOpenType;
};

// This hook registers all the Track-Player listeners for the two main views
const useEventListeners = (eventListener: listeners) => {
  const playingId = useRef('');

  const setPlayingFileFromTrackPlayer = useCallback(
    async (trackId: string) => {
      const track = await TrackPlayManager.getTrack(trackId);
      if (track === null) return;
      eventListener.trackChange(await convertFromTrackPlayer(track));
    },
    [eventListener],
  );

  usePlayerEvents(
    [EVENTS.PLAY, EVENTS.STOP, EVENTS.TRACK_CHANGED],
    (event: any) => {
      if (event.type === EVENTS.PLAY) {
        eventListener.keepPlayerOpen(true);
        return;
      }

      if (event.type === EVENTS.STOP) {
        eventListener.keepPlayerOpen(false);
        return;
      }

      if (event.type === EVENTS.TRACK_CHANGED) {
        if (event.nextTrack === null) {
          return;
        }
        eventListener.keepPlayerOpen(true);
        const nextId: string = event.nextTrack;

        if (playingId.current === nextId) return;
        playingId.current = nextId;
        setPlayingFileFromTrackPlayer(nextId);
        return;
      }
    },
  );
};

export default useEventListeners;
