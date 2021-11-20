import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Input, useInput } from './Input';
import { Badge, LinearProgress, Tooltip } from '@material-ui/core';
import logoImage from '../Resources/Images/Logo.png';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TelegramIcon from '@material-ui/icons/Telegram';
import PersonIcon from '@material-ui/icons/Person';

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  z-index: 2;
`;

const HeaderContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 0px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const Logo = styled.img`
  src: url(${(props) => props.src});
  width: 120px;
  height: auto;
  &:active {
    opacity: 0.7;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 15px;
  }
  color: black;
  cursor: pointer;
  &:active {
    opacity: 0.5;
  }
`;

const AddBadge = styled(Badge)`
  position: relative;
  bottom: 4px;
`;

const HomeButton = styled(HomeIcon)`
  position: relative;
  top: 3px;
`;

const MessageButton = styled(TelegramIcon)`
  position: relative;
  right: 1px;
  bottom: 1px;
`;

const NotificationButton = styled(NotificationsIcon)`
  position: relative;
  bottom: 1px;
  cursor: pointer;
`;

const ProfileButton = styled(PersonIcon)`
  position: relative;
  top: 3px;
  margin-left: 15px;
`;

export default withRouter(({ loading, history }) => {
  const searchInput = useInput('');
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${searchInput.value}`);
  };

  return (
    <Header>
      <HeaderContents>
        <HeaderWrapper>
          <HeaderColumn>
            <Link to='/'>
              <Logo src={logoImage} />
            </Link>
          </HeaderColumn>

          <HeaderColumn>
            <form onSubmit={onSearchSubmit}>
              <SearchInput
                value={searchInput.value}
                onChange={searchInput.onChange}
                placeholder='❣  검색'
              />
            </form>
          </HeaderColumn>

          <HeaderColumn>
            <HeaderLink to='/'>
              <Tooltip title='홈으로'>
                <HomeButton />
              </Tooltip>
            </HeaderLink>
            <HeaderLink to='/message'>
              <AddBadge color='secondary' variant='dot' badgeContent={1}>
                <Tooltip title='다이렉트 메시지'>
                  <MessageButton />
                </Tooltip>
              </AddBadge>
            </HeaderLink>
            <AddBadge color='secondary' variant='dot' badgeContent={1}>
              <Tooltip title='알림'>
                <NotificationButton />
              </Tooltip>
            </AddBadge>
            <HeaderLink to='/profile'>
              <Tooltip title='프로필'>
                <ProfileButton />
              </Tooltip>
            </HeaderLink>
          </HeaderColumn>
        </HeaderWrapper>
      </HeaderContents>
      {loading && <LinearProgress color='secondary' />}
    </Header>
  );
});
