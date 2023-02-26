import React from 'react';
import { View, ScrollView, RefreshControl, TextInput } from 'react-native';
import styled from 'styled-components';
import SquarePhoto from '../../../components/SquarePhoto';

const SquareContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const SearchPresenter = ({ loading, onRefresh, refreshing, data }) => {
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <SquareContainer>
          {!loading &&
            data &&
            data.searchPost &&
            data.searchPost.map((post) => (
              <SquarePhoto key={post.id} id={post.id} post={post} />
            ))}
        </SquareContainer>
      </ScrollView>
    </View>
  );
};

export default SearchPresenter;
