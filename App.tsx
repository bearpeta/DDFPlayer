import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PERMISSIONS} from 'react-native-permissions';
import SplashScreen from 'react-native-splash-screen';
import AudiobookProvider from 'lib/audiobooks/provider';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import {checkPermissions, requestPermissions} from 'lib/permission/permission';
import RootNavigation, {navigationRef} from 'navigation/RootNavigation';
import registerActions from 'lib/player/playerFileInfo/timer/notification/AndroidActionHandlers';

const appPermissions = [
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
];

type DDFAppState = {
  isReady: boolean;
};

type DDFAppProps = {};

export default class App extends React.Component<DDFAppProps, DDFAppState> {
  state = {
    isReady: false,
  };

  constructor(props: any) {
    super(props);
    registerActions(); // Notification actions for Android
  }

  componentDidMount() {
    this._prepareApp()
      .then(() => this.setState({isReady: true}))
      .catch((error) => {
        console.log('App PREPARE FAILED: ' + error);
        this.setState({isReady: true});
      });
  }

  render() {
    if (!this.state.isReady) {
      return <View />;
    }

    SplashScreen.hide();
    return (
      <NavigationContainer ref={navigationRef}>
        {RootNavigation()}
      </NavigationContainer>
    );
  }

  async _handlePermission() {
    const result = await checkPermissions(appPermissions);
    // All permissions are granted so we don't have to do anything
    if (result.denied.length === 0 && result.blocked.length === 0) {
      return;
    }

    const requestResult = await requestPermissions(result.denied);
    if (
      requestResult.denied.length === 0 &&
      requestResult.blocked.length === 0
    ) {
      return;
    }
    // TODO : WHAT TO DO WHEN NOT ALL PERMISSION ARE GIVEN
  }

  async _prepareApp() {
    const playerPromise = TrackPlayManager.setup();
    await this._handlePermission();
    const providerPromise = AudiobookProvider.setup();

    await Promise.all([providerPromise, playerPromise]);
    //playerPromise;
  }
}
