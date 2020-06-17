import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import beautifyTime from 'lib/helpers/beautifyTime';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import cancelTimer from './cancelTimer';
import getDefaultNotification from './notification/defaultNotification';
import InfoStorage from './notification/InfoStorage';
import {intervalKey, timeoutKey} from './type';

const getNotificationMessage = (time: string) => {
  return `${getDefaultNotification().message} ${time}`;
};

export let currentTimerTime: number = 0;

const startTimer = (timeInSec: number) => {
  currentTimerTime = timeInSec;
  const timeInMilliSec: number = timeInSec * 1000;
  const timeoutId: number = BackgroundTimer.setTimeout(() => {
    TrackPlayManager.stop().then(() => {
      TrackPlayManager.destroy();
      cancelTimer(true);
    });
  }, timeInMilliSec);

  InfoStorage.set(timeoutKey, timeoutId.toString());

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
  InfoStorage.set(intervalKey, intervalId.toString());
};

export default startTimer;
