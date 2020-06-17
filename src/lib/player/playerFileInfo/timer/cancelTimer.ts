import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import InfoStorage from './notification/InfoStorage';
import {intervalKey, timeoutKey} from './type';

const cancelTimer = async (completely: boolean = false) => {
  const infos: [string, string | null][] = await InfoStorage.getMultiple([
    intervalKey,
    timeoutKey,
  ]);
  infos.forEach((storageInfo) => {
    const key: string = storageInfo[0];
    const value: string | null = storageInfo[1];
    if (value === null) return;

    if (key === intervalKey) {
      BackgroundTimer.clearInterval(parseInt(value, 10));
    } else if (key === timeoutKey) {
      BackgroundTimer.clearTimeout(parseInt(value, 10));
    }
  });
  InfoStorage.remove(timeoutKey);
  InfoStorage.remove(intervalKey);

  if (completely) {
    PushNotification.cancelAllLocalNotifications();
  }
};

export default cancelTimer;
