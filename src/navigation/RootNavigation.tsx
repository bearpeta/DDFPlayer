import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumTabs from 'navigation/AlbumTabs';
import SettingScreen from 'screens/setting/SettingScreen';
import colors from 'res/colors';
import HeaderTitle from './HeaderTitle';
import HistoryScreen from 'screens/history/HistoryScreen';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: {}) {
  navigationRef.current?.navigate(name, params);
}

const Stack = createStackNavigator();

const generalOptions = {
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.primaryDark,
  },
};

const RootNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="AlbumTabNavigator">
      <Stack.Screen
        name="AlbumTabNavigator"
        component={AlbumTabs}
        options={{
          headerTitle: (props) => {
            return <HeaderTitle {...props} />;
          },
          ...generalOptions,
        }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: 'Settings',
          ...generalOptions,
        }}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: 'History',
          ...generalOptions,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
