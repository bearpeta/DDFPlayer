import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Setting from 'lib/setting/Setting';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
Setting.setup().finally(() =>
  TrackPlayer.registerPlaybackService(() => require('./player_service.js')),
);
