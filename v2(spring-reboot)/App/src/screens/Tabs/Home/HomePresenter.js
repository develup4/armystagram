import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Divider } from 'react-native-paper';
import { FloatingAction } from 'react-native-floating-action';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../../styles/theme';
import MemberPanel from '../../../components/MemberPanel';
import Post from '../../../components/Post';

// Floating icons
const actions = [
  {
    color: theme.blueColor,
    text: 'ALL FEEDS',
    textStyle: { fontFamily: 'HelveticaNeueLt' },
    name: 'ALL',
    icon: <Ionicons name={'md-images'} color='white' size={24} />,
  },
  {
    color: theme.blueColor,
    text: 'POPULAR',
    textStyle: { fontFamily: 'HelveticaNeueLt' },
    name: 'POPULAR',
    icon: <Ionicons name={'ios-star'} color='white' size={24} />,
  },
  {
    color: theme.blueColor,
    text: 'LIKED',
    textStyle: { fontFamily: 'HelveticaNeueLt' },
    name: 'LIKED',
    icon: <Ionicons name={'ios-heart'} color='white' size={24} />,
  },
  {
    color: theme.blueColor,
    text: 'FOLLOWER',
    textStyle: { fontFamily: 'HelveticaNeueLt' },
    name: 'FOLLOWER',
    icon: <Ionicons name={'md-contacts'} color='white' size={24} />,
  },
];

export default ({
  refreshing,
  onRefresh,
  floatIcon,
  setFloatIcon,
  filter,
  setFilter,
  selectedMember,
  setSelectedMember,
  posts,
}) => {
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ backgroundColor: 'white' }}
      >
        <MemberPanel
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
        />
        <Divider />
        {posts && posts.map((post) => <Post key={post.id} {...post} />)}
      </ScrollView>

      <FloatingAction
        color={theme.blueColor}
        actions={actions}
        onPressItem={(name) => {
          switch (name) {
            case 'ALL':
              setFloatIcon('md-images');
              break;
            case 'POPULAR':
              setFloatIcon('ios-star');
              break;
            case 'LIKED':
              setFloatIcon('ios-heart');
              break;
            case 'FOLLOWER':
              setFloatIcon('md-contacts');
              break;
          }
          setFilter(name);
        }}
        floatingIcon={
          <View style={{ alignItems: 'center' }}>
            <Ionicons name={floatIcon} color='white' size={36} />
            <Text
              style={{
                fontFamily: 'HelveticaNeueBd',
                color: 'white',
                fontSize: 5,
              }}
            >
              {filter}
            </Text>
          </View>
        }
      />
    </View>
  );
};
