import {EVENTS} from 'lib/trackplaymanager/events';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';

module.exports = async function () {
  await TrackPlayManager.setup();

  TrackPlayManager.addEventListener(EVENTS.PLAY, () => {
    //console.log('BACKGROUND: PLAY');
    TrackPlayManager.resume();
  });

  TrackPlayManager.addEventListener(EVENTS.PAUSE, () => {
    //console.log('BACKGROUND: PAUSE');
    TrackPlayManager.pause();
  });

  TrackPlayManager.addEventListener(EVENTS.STOP, () => {
    //console.log('BACKGROUND: STOP');
    TrackPlayManager.stop().then(() => TrackPlayManager.destroy());
  });

  TrackPlayManager.addEventListener(EVENTS.SEEK_TO, (event) => {
    // console.log('BACKGROUND: SEEK TO');
    TrackPlayManager.seekTo(event.position);
  });

  TrackPlayManager.addEventListener(EVENTS.SKIP_NEXT, () => {
    //console.log('BACKGROUND: NEXT');
    TrackPlayManager.skipToNext();
  });

  TrackPlayManager.addEventListener(EVENTS.SKIP_PREVIOUS, () => {
    //console.log('BACKGROUND: previous');
    TrackPlayManager.skipToPrevious();
  });
};
