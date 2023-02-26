import React from 'react';
import { ScrollView } from 'react-native';
import Post from '../../../components/Post';

export default ({ navigation, route }) => {
  const { params } = route;

  // Header
  navigation.setOptions({
    headerTitle: 'FEED',
  });

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Post {...params.post}></Post>
    </ScrollView>
  );
};
