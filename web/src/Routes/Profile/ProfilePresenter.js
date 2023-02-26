import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'rl-react-helmet';
import styled, { keyframes } from 'styled-components';
import Header from '../../Components/Header';
import ProfilePicture from '../../Components/ProfilePicture';
import FatText from '../../Components/FatText';
import FollowButton from '../../Components/Button/FollowButton';
import SquarePost from '../../Components/SquarePost';
import Button from '../../Components/Button/Button';
import InfluencerIcon from '../../Resources/Images/Influencer.png';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Avatar, Tooltip, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProfileHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div`
  margin-left: 100px;
`;

const gradient = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const gradient_inverse = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const ProfileImg = styled.img`
  src: url(${(props) => props.src});
  width: 150px;
  height: 150px;
  border-radius: 70%;
  border: 3px solid #dbdbdb;
  padding: 1px;
`;

const SelectedProfileImg = styled.img`
  src: url(${(props) => props.src});
  width: 150px;
  height: 150px;
  border-radius: 70%;
  padding: 1px;
  animation: ${gradient_inverse} 1s linear infinite;
`;

const Selected = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 154px;
  height: 154px;
  border-radius: 70%;
  background: -webkit-linear-gradient(left bottom, #f99d4c 0%, #c72d8f 100%);
  animation: ${gradient} 1s linear infinite;
`;

const ButtonWrapper = styled.div`
  margin-left: 10px;
  width: 80px;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  display: block;
`;

const Influencer = styled.img`
  margin-right: 5px;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  margin-bottom: 5px;
  background: white;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  margin-left: 6px;
  margin-right: 15px;
`;

const MenuTab = styled(Tabs)`
  margin-bottom: 15px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
  grid-gap: 15px;
`;

const Followers = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 400px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  grid-gap: 30px;
`;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default ({
  loading,
  data,
  me,
  members,
  likePosts,
  logOut,
  registerMostLike,
  selectedTab,
  tabChange,
}) => {
  const classes = useStyles();

  if (loading === true) {
    return <Header loading={true} />;
  } else if (!loading && data) {
    const {
      id,
      profile,
      username,
      following,
      followers,
      isMember,
      isFollowing,
      isSelf,
      followingCount,
      followersCount,
      postsCount,
      posts,
    } = data;

    return (
      <>
        <Header loading={loading} />
        <Wrapper>
          <Helmet>
            <title>{username} | Armystagram</title>
          </Helmet>
          <ProfileHeader>
            <HeaderColumn>
              {me && me.mostLike === username ? (
                <Selected>
                  <SelectedProfileImg src={profile} />
                </Selected>
              ) : (
                <ProfileImg src={profile} />
              )}
            </HeaderColumn>
            <HeaderColumn>
              <UsernameRow>
                <Username>{username}</Username>{' '}
                {isMember && <Influencer src={InfluencerIcon} />}
                {isSelf && (
                  <ButtonWrapper>
                    <Button onClick={logOut} text='로그아웃' />
                  </ButtonWrapper>
                )}
                {isMember && isFollowing && me && me.mostLike !== username && (
                  <ButtonWrapper>
                    <Button onClick={registerMostLike} text='최애멤버' />
                  </ButtonWrapper>
                )}
                {isMember && isSelf === false && isFollowing === false && (
                  <ButtonWrapper>
                    <FollowButton isFollowing={isFollowing} id={id} />
                  </ButtonWrapper>
                )}
              </UsernameRow>
              <Counts>
                <Count>
                  게시물 <FatText text={String(postsCount)} />
                </Count>
                <Count>
                  팔로워 <FatText text={String(followersCount)} />
                </Count>
                <Count>
                  팔로우 <FatText text={String(followingCount)} />
                </Count>
              </Counts>
              {members && (
                <AvatarGroup max={7}>
                  {members.map(
                    (member) =>
                      member.followingMe && (
                        <Tooltip
                          key={member.username}
                          title={`나를 팔로우한 멤버, ${member.username}`}
                          placement='left'
                          arrow
                        >
                          <Avatar
                            className={classes.large}
                            src={member.profile}
                          />
                        </Tooltip>
                      )
                  )}
                </AvatarGroup>
              )}
            </HeaderColumn>
          </ProfileHeader>
          {isSelf && (
            <MenuTab value={selectedTab} onChange={tabChange} centered>
              <Tab label='내 게시물' />
              <Tab label='좋아요' />
              <Tab label='팔로우 목록' />
            </MenuTab>
          )}
          {selectedTab === 0 && (
            <Posts>
              {posts &&
                posts.map((post, index) => (
                  <SquarePost
                    key={index}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    file={post.files[0]}
                    mine={true}
                  />
                ))}
            </Posts>
          )}
          {selectedTab === 1 && (
            <Posts>
              {likePosts &&
                likePosts.map((post, index) => (
                  <SquarePost
                    key={index}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    file={post.files[0]}
                    mine={false}
                  />
                ))}
            </Posts>
          )}
          {selectedTab === 2 && <FatText text='팔로우 목록' />}
          <Followers>
            {selectedTab === 2 &&
              following.map((user, index) => (
                <div key={index}>
                  <ProfilePicture size='middle' url={user.profile} />
                  <Link to={`/${user.username}`}>
                    <FatText text={user.username} />
                  </Link>
                  {user.mostLike !== '' && user.mostLike !== undefined && (
                    <h1>최애멤버 : {user.mostLike}</h1>
                  )}
                  <FollowButton isFollowing={user.followingMe} id={user.id} />
                </div>
              ))}
          </Followers>
          {selectedTab === 2 && <FatText text='팔로워 목록' />}
          <Followers>
            {selectedTab === 2 &&
              followers.map((user, index) => (
                <div key={index}>
                  <ProfilePicture size='middle' url={user.profile} />
                  <Link to={`/${user.username}`}>
                    <FatText text={user.username} />
                  </Link>
                  {user.mostLike !== '' && user.mostLike !== undefined && (
                    <h1>최애멤버 : {user.mostLike}</h1>
                  )}
                  <FollowButton isFollowing={user.isFollowing} id={user.id} />
                </div>
              ))}
          </Followers>
        </Wrapper>
      </>
    );
  }
  return null;
};
