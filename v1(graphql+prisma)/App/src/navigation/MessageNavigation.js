import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Messages from '../screens/Messages/Messages';
import Message from '../screens/Messages/Message';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name='Messages' component={Messages} />
    <Stack.Screen name='Message' component={Message} />
  </Stack.Navigator>
);
