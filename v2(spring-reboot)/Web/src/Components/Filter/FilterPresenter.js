import React from 'react';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';

const FilterWrapper = styled.div`
  margin-left: 5px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const Title = styled.h1`
  font-weight: 900;
  margin-bottom: 10px;
  color: #8e8e8e;
`;

const SeeFeedForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const SeeFeedCheck = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SeeAll = styled.span`
  font-size: 5px;
  font-weight: 900;
  margin-right: 2px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  display: inline-block;
  width: 17px;
  height: 17px;
  cursor: pointer;
  border-radius: 3px;
`;
// TODO : EDGE COLOR GREY

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
`;

export default ({
  isLogin,
  filterNames,
  filterExplains,
  filterState,
  setFilterState,
  filterDisabled,
}) => {
  return (
    <FilterWrapper>
      <TitleWrapper>
        <Title>피드 보기</Title>
        <Tooltip
          title='보고싶은 게시물을 설정할 수 있어요'
          placement='top'
          arrow
        >
          <SeeAll>필터설정</SeeAll>
        </Tooltip>
      </TitleWrapper>
      <SeeFeedForm>
        {filterNames.map((Filter, index) => (
          <SeeFeedCheck key={index}>
            <Tooltip title={filterExplains[index]} placement='right-start'>
              <Label>{Filter}</Label>
            </Tooltip>
            <Checkbox
              name={Filter}
              type='checkbox'
              checked={filterState[index]}
              disabled={filterDisabled[index]}
              onChange={() => {
                if (index === 0) {
                  if (filterState[0] === true) {
                    if (isLogin) {
                      setFilterState([false, false, false, true]);
                    } else {
                      setFilterState([false, true, false, false]);
                    }
                  } else {
                    setFilterState([true, false, false, false]);
                  }
                } else {
                  const currentState = filterState;
                  currentState[index] = !currentState[index];

                  setFilterState([
                    currentState[1] === true ||
                    currentState[2] === true ||
                    currentState[3] === true
                      ? false
                      : true,
                    currentState[1],
                    currentState[2],
                    currentState[3],
                  ]);
                }
              }}
            />
          </SeeFeedCheck>
        ))}
      </SeeFeedForm>
    </FilterWrapper>
  );
};
