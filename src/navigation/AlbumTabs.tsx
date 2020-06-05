import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from 'res/colors';
import SpecialAlbumScreen from 'screens/album/SpecialAlbumScreen';
import NumbAlbumScreen from 'screens/album/NumAlbumScreen';

const Tab = createMaterialTopTabNavigator();

const AlbumTabs = (): JSX.Element => {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: colors.blue,
        pressColor: colors.primaryLight,
        inactiveTintColor: colors.primaryLightest,
        labelStyle: {
          //fontSize: 11,
        },
        indicatorStyle: {
          backgroundColor: colors.red,
        },
        style: {
          backgroundColor: colors.primary,
        },
      }}>
      <Tab.Screen name="Numbered albums" component={NumbAlbumScreen} />
      <Tab.Screen name="Special albums" component={SpecialAlbumScreen} />
    </Tab.Navigator>
  );
};

export default AlbumTabs;
