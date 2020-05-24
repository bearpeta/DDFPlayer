import TrackPlayer from 'react-native-track-player';
import {ToastAndroid} from 'react-native';
import Setting from 'lib/setting/Setting';
import images from 'res/image';

type Capability = TrackPlayer.Capability;

const capabilities: Capability[] = [
  TrackPlayer.CAPABILITY_PLAY,
  TrackPlayer.CAPABILITY_PAUSE,
  TrackPlayer.CAPABILITY_STOP,
  TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
  TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  TrackPlayer.CAPABILITY_SEEK_TO,
  TrackPlayer.CAPABILITY_JUMP_FORWARD,
  TrackPlayer.CAPABILITY_JUMP_BACKWARD,
];

const notificationCapabilities: Capability[] = [
  TrackPlayer.CAPABILITY_PLAY,
  TrackPlayer.CAPABILITY_PAUSE,
  TrackPlayer.CAPABILITY_STOP,
  TrackPlayer.CAPABILITY_SEEK_TO,
  TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
];

const compactCapabilities: Capability[] = [
  TrackPlayer.CAPABILITY_PLAY,
  TrackPlayer.CAPABILITY_PAUSE,
  TrackPlayer.CAPABILITY_STOP,
  TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
];

const setup = async (): Promise<void> => {
  try {
    await TrackPlayer.setupPlayer({
      // @ts-ignore
      backBuffer: 60,
    });

    await TrackPlayer.updateOptions({
      jumpInterval: Setting.get('playerJumpInterval'),
      //@ts-ignore
      alwaysPauseOnInterruption: true,
      icon: images.notificationIcon,
      capabilities: capabilities,
      notificationCapabilities: notificationCapabilities,
      compactCapabilities: compactCapabilities,
    });
  } catch (e) {
    ToastAndroid.show('TRACKPLAYER SETUP FAILED', ToastAndroid.LONG);
    return Promise.reject(e);
  }
};

export default setup;
