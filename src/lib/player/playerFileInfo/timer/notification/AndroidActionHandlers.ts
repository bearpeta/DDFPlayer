import {DeviceEventEmitter} from 'react-native';
import PushNotificationAndroid from 'react-native-push-notification';
import cancelTimer from '../cancelTimer';
import updateTimer from '../updateTimer';

const actionAddTime = 'Add time';
const actionCancelTimer = 'Cancel timer';
const androidActions = [actionAddTime, actionCancelTimer];

const registerActions = function () {
  PushNotificationAndroid.registerNotificationActions(androidActions);
  DeviceEventEmitter.addListener('notificationActionReceived', function (
    action,
  ) {
    console.log('Notification action received: ' + action);
    const info = JSON.parse(action.dataJSON);
    if (info.action === actionCancelTimer) {
      cancelTimer(true);
    } else if (info.action === actionAddTime) {
      updateTimer(600); //plus 10 minutes
    }
  });
};
export {actionAddTime, actionCancelTimer};
export default registerActions;
