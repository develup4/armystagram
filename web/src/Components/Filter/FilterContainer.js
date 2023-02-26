import React from 'react';
import PropTypes from 'prop-types';
import FilterPresenter from './FilterPresenter';

const FilterContainer = ({ isLogin, filterState, setFilterState }) => {
  const filterNames = [
    '모두 보기',
    '인기글 보기',
    '좋아요 보기',
    '팔로워 보기',
  ];

  const filterExplains = [
    '모든 게시물을 보여줄께요!',
    '오늘의 인기글을 확인해보세요',
    '좋아요를 눌렀던 게시물을 다시 볼 수 있어요',
    '팔로워와 내 게시물만 볼 수 있어요',
  ];

  const filterDisabled = isLogin
    ? [false, false, false, false]
    : [false, false, true, true];

  return (
    <FilterPresenter
      isLogin={isLogin}
      filterNames={filterNames}
      filterExplains={filterExplains}
      filterState={filterState}
      setFilterState={setFilterState}
      filterDisabled={filterDisabled}
    />
  );
};

FilterContainer.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default FilterContainer;
