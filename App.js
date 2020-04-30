import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {PERMISSIONS} from 'react-native-permissions';
import {checkPermissions, requestPermissions} from 'lib/permission/permission';
import SplashScreen from 'react-native-splash-screen';
import AudiobookProvider from 'lib/audiobooks/provider';
import NumberedAlbumScreen from './src/screens/numbered_album/NumberedAlbumScreen';
import SpecialAlbumScreen from './src/screens/special_album/SpecialAlbumScreen';
import SettingScreen from './src/screens/setting/SettingScreen';
import colors from 'res/colors';

const appPermissions = [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];

const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.red,
        pressColor: colors.primaryLight,
        inactiveTintColor: colors.primaryLightest,
        labelStyle: {
          //fontSize: 11,
        },
        indicatorStyle: {
          backgroundColor: colors.blue,
        },
        style: {
          backgroundColor: colors.primary,
        },
      }}>
      <Tab.Screen name="Nummerierte Alben" component={NumberedAlbumScreen} />
      <Tab.Screen name="Special Alben" component={SpecialAlbumScreen} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="AlbumTabNavigator" headerMode="none">
      <Stack.Screen name="AlbumTabNavigator" component={MyTabs} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
}

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this._prepareApp()
      .then(() => this.setState({isReady: true}))
      .catch(error => {
        console.log('App PREPARE FAILED: ' + error);
        this.setState({isReady: true});
      });
  }

  render() {
    if (!this.state.isReady) {
      return <View />;
    }

    SplashScreen.hide();
    return <NavigationContainer>{RootStack()}</NavigationContainer>;
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
    await this._handlePermission();
    await AudiobookProvider.setup();
  }
}
