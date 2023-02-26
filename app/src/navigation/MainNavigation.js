import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import MessageNavigation from './MessageNavigation';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='none'
        mode='modal'
        initialRouteName='TabNavigation'
      >
        <Stack.Screen name='AuthNavigation' component={AuthNavigation} />
        <Stack.Screen name='TabNavigation' component={TabNavigation} />
        <Stack.Screen name='MessageNavigation' component={MessageNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
