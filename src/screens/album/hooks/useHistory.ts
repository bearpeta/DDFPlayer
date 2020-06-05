import {useRef, MutableRefObject, useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import {EVENTS} from 'lib/trackplaymanager/events';
import {addHistory} from 'lib/history';
import {listTypes} from 'lib/audiobooks/provider/type';

const timeout = 5000; // 2 minutes in milliseconds    120000

const useHistory = (type: listTypes) => {
  const appJustStarted = useRef(true);
  const historyType = useRef(type);
  const timeoutId: MutableRefObject<number | null> = useRef(null);
  const playingId = useRef('');

  useEffect(() => {
    setTimeout(() => (appJustStarted.current = false), 5000);
    TrackPlayManager.addEventListener(EVENTS.TRACK_CHANGED, (event) => {
      if (event.nextTrack === null) {
        return;
      }
      const nextId: string = event.nextTrack;
      const trackType: listTypes = isNaN(parseInt(nextId, 10))
        ? 'special'
        : 'numbered';

      // Since I setup the track player with the last played file when the app starts, I had to add a check if this event is fired for the first time because that would be the last played file and we don't want to add an history then.
      // ATTENTION: THIS IS NOT REALLY NICE DONE! IF THERE IS NO LAST PLAYED FILE SET, THE FIRST FILE PLAYED WON'T HAVE AN HISTORY ENTRY!
      if (appJustStarted.current) {
        appJustStarted.current = false;
        return;
      }

      // Since this hook will get used by both album screens, which means that this TrackPlayManager event will be triggered twice every time a track changed. To prevent that we double save a history, we check if the track type is the same as the type we pass to this hook.
      if (historyType.current !== trackType) return;
      // "TRACK_CHANGED" gets fired a couple times for the same new track, but we want to save the history just one time.
      if (playingId.current === nextId) return;

      // if there is an ongoing timeout from a previous track, I delete it.
      // It means, that the user changed the track before the timeout was over.
      if (timeoutId.current !== null) {
        BackgroundTimer.clearTimeout(timeoutId.current);
      }
      // We add a history entry with a timeout, this way I want prevent that a history entry gets created when a user starts an album by mistake.

      timeoutId.current = BackgroundTimer.setTimeout(() => {
        addHistory(nextId);
        timeoutId.current = null;
      }, timeout);
    });
  }, []);
};

export default useHistory;
