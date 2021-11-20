import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { SEARCH } from './SearchQueries';
import SearchPresenter from './SearchPresenter';
import { toast } from 'react-toastify';

export default withRouter(({ location: { search } }) => {
  const term = search.split('=')[1];

  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined || term[0] === '%',
    variables: {
      term,
    },
  });

  if (data && data.searchPost && data.searchPost.length === 0) {
    toast.error('일치하는 검색결과가 없어요 ㅠ');
  }

  let images = [];
  if (data && data.searchPost) {
    data.searchPost.forEach(post => {
      post.files.forEach(file => {
        images.push(file.url);  
      });
    });
  }
  
  return <SearchPresenter loading={loading} images={images} />;
});
