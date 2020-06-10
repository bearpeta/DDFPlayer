import {useCallback, useEffect, useRef} from 'react';
import {convertFromTrackPlayer} from 'lib/audiobooks/convert';
import {EVENTS} from 'lib/trackplaymanager/events';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
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

  useEffect((): void => {
    TrackPlayManager.addEventListener(EVENTS.PLAY, (_event: any) => {
      eventListener.keepPlayerOpen(true);
    });

    TrackPlayManager.addEventListener(EVENTS.STOP, (_event: any) => {
      eventListener.keepPlayerOpen(false);
    });

    TrackPlayManager.addEventListener(EVENTS.TRACK_CHANGED, (event: any) => {
      if (event.nextTrack === null) {
        return;
      }
      eventListener.keepPlayerOpen(true);
      const nextId: string = event.nextTrack;

      if (playingId.current === nextId) return;
      playingId.current = nextId;
      setPlayingFileFromTrackPlayer(nextId);
    });
  }, [eventListener, setPlayingFileFromTrackPlayer]);
};

export default useEventListeners;
