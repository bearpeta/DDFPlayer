import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import beautifyTime from 'lib/helpers/beautifyTime';
import getDefaultNotification from './notification/defaultNotification';
import InfoStorage from './notification/InfoStorage';
import cancelTimer from './cancelTimer';

const getNotificationMessage = (time: string) => {
  return `${getDefaultNotification().message} ${time}`;
};

export let currentTimerTime: number = 0;

const startTimer = (timeInSec: number) => {
  currentTimerTime = timeInSec;
  const timeInMilliSec: number = timeInSec * 1000;
  const timeoutId: number = BackgroundTimer.setTimeout(() => {
    TrackPlayManager.stop().then(() => cancelTimer(true));
  }, timeInMilliSec);

  InfoStorage.set('background_timeout_id', timeoutId.toString());

  const beautyTime = beautifyTime(currentTimerTime);

  const notification = getDefaultNotification();
  notification.message = getNotificationMessage(beautyTime);

  PushNotification.localNotification(notification);
  const intervalId = BackgroundTimer.setInterval(() => {
    currentTimerTime--;
    const newNotification = getDefaultNotification();
    newNotification.message = getNotificationMessage(
      beautifyTime(currentTimerTime),
    );
    PushNotification.localNotification(newNotification);
  }, 1000);
  InfoStorage.set('background_interval_id', intervalId.toString());
};

export default startTimer;
