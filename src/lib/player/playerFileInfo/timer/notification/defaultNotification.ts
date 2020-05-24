import colors from 'res/colors';
import {PushNotificationObject} from 'react-native-push-notification';
import {actionAddTime, actionCancelTimer} from './AndroidActionHandlers';

export const defaultNotificationId: string = '1234567890';

/*
 NOT USED PROPERTIES:
  bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
  subText: 'This is a subText ' + t, // (optional) default: none, appears in notification header
  vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
  tag: 'some_tag', // (optional) add tag to message
  group: 'group', // (optional) add group to message
  soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.

*/

const getDefaultNotification = (): PushNotificationObject => {
  return {
    /* Android Only Properties */
    id: defaultNotificationId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    autoCancel: false, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    color: colors.red, // (optional) default: system default
    vibrate: false, // (optional) default: true
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: 'high', // (optional) set notification priority, default: high
    visibility: 'public', // (optional) set notification visibility, default: private
    importance: 'high', // (optional) set notification importance, default: high
    //@ts-ignore
    allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

    /* iOS and Android properties */
    title: 'DDF Timer', // (optional)
    message: 'Time until stop:', // (required)
    playSound: false, // (optional) default: true
    number: defaultNotificationId, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    actions: `["${actionAddTime}", "${actionCancelTimer}"]`, // (Android only) See the doc for notification actions to know more
  };
};

export default getDefaultNotification;
