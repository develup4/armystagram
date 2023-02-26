import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
