import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import Setting from 'lib/setting/Setting';

AppRegistry.registerComponent(appName, () => App);
Setting.setup().finally(() =>
  TrackPlayer.registerPlaybackService(() => require('./player_service.js')),
);
