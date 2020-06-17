import {EVENTS} from 'lib/trackplaymanager/events';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';

module.exports = async function () {
  await TrackPlayManager.setup();

  TrackPlayManager.addEventListener(EVENTS.PLAY, () => {
    TrackPlayManager.resume();
  });

  TrackPlayManager.addEventListener(EVENTS.PAUSE, () => {
    TrackPlayManager.pause();
  });

  TrackPlayManager.addEventListener(EVENTS.STOP, () => {
    TrackPlayManager.stop().then(() => TrackPlayManager.destroy());
  });

  TrackPlayManager.addEventListener(EVENTS.SEEK_TO, (event) => {
    TrackPlayManager.seekTo(event.position);
  });

  TrackPlayManager.addEventListener(EVENTS.SKIP_NEXT, () => {
    TrackPlayManager.skipToNext();
  });

  TrackPlayManager.addEventListener(EVENTS.SKIP_PREVIOUS, () => {
    TrackPlayManager.skipToPrevious();
  });
};
