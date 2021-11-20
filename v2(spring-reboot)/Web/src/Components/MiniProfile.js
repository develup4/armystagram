import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { ME, LOG_OUT } from '../Resources/SharedQueries/SharedQueries';
import defaultProfile from '../Resources/Images/Default.png';
import Button from './Button/Button';

const Wrapper = styled.div`
  margin-top: 22px;
  margin-left: 5px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const ProfileImg = styled.img`
  src: url(${(props) => props.src});
  width: 60px;
  height: 60px;
  border-radius: 70%;
`;

const ProfileWrapper = styled.div`
  margin-left: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Username = styled.span`
  font-weight: 600;
`;

const Email = styled.p`
  color: grey;
  font-size: 5px;
`;

const LoginWrapper = styled.div`
  width: 60px;
  justify-self: flex-end;
  align-self: center;
  margin-left: 22px;
  &:active {
    opacity: 0.7;
  }
`;

const MiniProfile = ({ isLogin }) => {
  const localLogOutMutation = useMutation(LOG_OUT);

  return (
    <Wrapper>
      {isLogin ? <LoginProfile /> : <DefaultProfile />}
      <LoginWrapper>
        {isLogin ? (
          <Button text={'로그아웃'} onClick={localLogOutMutation}></Button>
        ) : (
          <Link to='/auth'>
            <Button text={'로그인'}></Button>
          </Link>
        )}
      </LoginWrapper>
    </Wrapper>
  );
};

const DefaultProfile = () => {
  return (
    <>
      <ProfileImg src={defaultProfile} />
      <ProfileWrapper>
        <Username>{'ARMY'}</Username>
        <Email>{'로그인이 필요해요'}</Email>
      </ProfileWrapper>
    </>
  );
};

const LoginProfile = () => {
  const { loading, data } = useQuery(ME);

  return (
    <>
      {!loading && data && data.me ? (
        <>
          <ProfileImg src={data.me.profile} />
          <ProfileWrapper>
            <Username>{data.me.username}</Username>
            <Email>{data.me.email}</Email>
          </ProfileWrapper>
        </>
      ) : (
        <DefaultProfile />
      )}
    </>
  );
};

export default withRouter(MiniProfile);
