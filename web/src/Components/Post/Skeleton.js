import React from 'react';
import styled from 'styled-components';
import FatText from '../FatText';
import TextareaAutosize from 'react-autosize-textarea';
import { IconButton } from '@material-ui/core';

// Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import TelegramIcon from '@material-ui/icons/Telegram';

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 650px;
  user-select: none;
  margin-bottom: 25px;
  a {
    color: inherit;
  }
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Profile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 70%;
  border: 1px solid #d0d0d0;
`;

const ProfileWrapper = styled.div`
  display: flex;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const PictureCount = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 7px;
`;

const FollowIcon = styled(PersonAddIcon)`
  color: black;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 30px;
`;

const LikeButton = styled(IconButton)`
  position: relative;
  right: 15px;
  bottom: 5px;
`;

const LikeEmptyIcon = styled(FavoriteBorderOutlinedIcon)`
  color: black;
`;

const ViewButton = styled(IconButton)`
  position: relative;
  right: 28px;
  bottom: 5px;
`;

const SlideViewIcon = styled(ViewCompactIcon)`
  color: black;
`;

const MessageButton = styled(IconButton)`
  right: 41px;
  position: relative;
  bottom: 5px;
`;

const MessageIcon = styled(TelegramIcon)`
  color: black;
`;

const Divide = styled.div`
  margin: 12px 0px;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

export const Skeleton = () => (
  <Post>
    <Header>
      <ProfileWrapper>
        <Profile />
        <UserColumn>
          <PictureCount>0 picture</PictureCount>
        </UserColumn>
      </ProfileWrapper>
      <FollowIcon />
    </Header>
    <Files></Files>
    <Meta>
      <Buttons>
        <LikeButton color='secondary'>
          <LikeEmptyIcon />
        </LikeButton>
        <ViewButton>
          <SlideViewIcon />
        </ViewButton>
        <MessageButton>
          <MessageIcon />
        </MessageButton>
      </Buttons>
      <FatText text={'0 like'} />
      <Divide />
      <Textarea placeholder={'댓글 달기...'} />
    </Meta>
  </Post>
);
