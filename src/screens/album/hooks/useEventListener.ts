import {useCallback, useEffect, useRef} from 'react';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import {EVENTS} from 'lib/trackplaymanager/events';
import {AudioFile} from 'lib/audiobooks/type';
import {convertFromTrackPlayer} from 'lib/audiobooks/convert';

type listeners = {
  trackChange: (playingFile: AudioFile) => void;
  keepPlayerOpen: (keepPlayerOpen: boolean) => void;
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
