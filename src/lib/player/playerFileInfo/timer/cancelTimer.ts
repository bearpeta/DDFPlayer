import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import InfoStorage from './notification/InfoStorage';

const cancelTimer = async (completely: boolean = false) => {
  const infos: [string, string | null][] = await InfoStorage.getMultiple([
    'background_interval_id',
    'background_timeout_id',
  ]);
  infos.forEach((storageInfo) => {
    const key: string = storageInfo[0];
    const value: string | null = storageInfo[1];
    if (value === null) return;

    if (key === 'background_interval_id') {
      BackgroundTimer.clearInterval(parseInt(value, 10));
    } else if (key === 'background_timeout_id') {
      BackgroundTimer.clearTimeout(parseInt(value, 10));
    }
  });
  InfoStorage.remove('background_timeout_id');
  InfoStorage.remove('background_interval_id');

  if (completely) {
    PushNotification.cancelAllLocalNotifications();
  }
};

export default cancelTimer;
