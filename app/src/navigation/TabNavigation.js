import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search';
import SelectPhoto from '../screens/Tabs/Photo/SelectPhoto';
import UploadPhoto from '../screens/Tabs/Photo/UploadPhoto';
import Notifications from '../screens/Tabs/Notifications';
import Profile from '../screens/Tabs/Profile/Profile';
import PostDetail from '../screens/Tabs/Profile/PostDetail';
import UserDetail from '../screens/Tabs/Profile/UserDetail';
import FollowList from '../screens/Tabs/Profile/FollowList';
import NavIcon from '../components/NavIcon';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: { backgroundColor: '#FAFAFA' },
    }}
    initialRouteName='Home'
  >
    <Tab.Screen
      name='Home'
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          />
        ),
      }}
    >
      {() => (
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='PostDetail' component={PostDetail} />
          <Stack.Screen name='UserDetail' component={UserDetail} />
        </Stack.Navigator>
      )}
    </Tab.Screen>

    <Tab.Screen
      name='Search'
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
          />
        ),
      }}
    >
      {() => (
        <Stack.Navigator>
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='PostDetail' component={PostDetail} />
          <Stack.Screen name='UserDetail' component={UserDetail} />
        </Stack.Navigator>
      )}
    </Tab.Screen>

    <Tab.Screen
      name='Add'
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === 'ios'
                ? 'ios-add-circle-outline'
                : 'md-add-circle-outline'
            }
          />
        ),
      }}
    >
      {() => (
        <Stack.Navigator>
          <Stack.Screen name='SelectPhoto' component={SelectPhoto} />
          <Stack.Screen name='UploadPhoto' component={UploadPhoto} />
        </Stack.Navigator>
      )}
    </Tab.Screen>

    <Tab.Screen
      name='Notifications'
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
          />
        ),
      }}
    >
      {() => (
        <Stack.Navigator>
          <Stack.Screen name='Notifications' component={Notifications} />
          <Stack.Screen name='PostDetail' component={PostDetail} />
          <Stack.Screen name='UserDetail' component={UserDetail} />
        </Stack.Navigator>
      )}
    </Tab.Screen>

    <Tab.Screen
      name='Profile'
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
          />
        ),
      }}
    >
      {() => (
        <Stack.Navigator>
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='PostDetail' component={PostDetail} />
          <Stack.Screen name='UserDetail' component={UserDetail} />
          <Stack.Screen name='FollowList' component={FollowList} />
        </Stack.Navigator>
      )}
    </Tab.Screen>
  </Tab.Navigator>
);
