import {useCallback, useEffect} from 'react';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import {EVENTS} from 'lib/trackplaymanager/events';

type listenerType = (setIsPlayerOpen: boolean) => void;

// This hook registers all the Track-Player listeners for the view
const useEventListeners = (setIsPlayerOpen: listenerType) => {
  const addListener = useCallback((): void => {
    TrackPlayManager.addEventListener(EVENTS.PLAY, (_event: any) => {
      console.log('NUMBERED_ALBUM_SCREEN: REMOTE PLAY');
      setIsPlayerOpen(true);
    });

    TrackPlayManager.addEventListener(EVENTS.STOP, (_event: any) => {
      console.log('NUMBERED_ALBUM_SCREEN: REMOTE STOP');
      setIsPlayerOpen(false);
    });
  }, [setIsPlayerOpen]);

  useEffect(() => {
    addListener();
  }, [addListener]);
};

export default useEventListeners;
