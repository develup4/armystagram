import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FatText from '../FatText';
import TextareaAutosize from 'react-autosize-textarea';
import SimpleImageSlider from 'react-simple-image-slider';
import ProfilePicture from '../ProfilePicture';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  IconButton,
  Avatar,
  Tooltip,
  GridList,
  GridListTile,
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import InfluencerIcon from '../../Resources/Images/Influencer.png';

// Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
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

const ProfileWrapper = styled.div`
  display: flex;
`;

const ProfilePic = styled(ProfilePicture)`
  border: 1px solid #dbdbdb;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1px;
`;

const InfluencerComment = styled.img`
  margin-right: 5px;
  width: 12px;
  height: 12px;
  background: white;
`;

const InfluencerBadge = styled(InfluencerComment)`
  margin-left: 2px;
  margin-bottom: 2px;
`;

const PictureCount = styled.span`
  display: block;
  margin-top: 2px;
  font-size: 7px;
`;

const FollowButton = styled(IconButton)`
  height: 30px;
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

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 650px;
  position: absolute;
  top: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
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

const LikeIcon = styled(FavoriteIcon)`
  color: #ed4956;
`;

const ViewButton = styled(IconButton)`
  position: relative;
  right: 28px;
  bottom: 5px;
`;

const SlideViewIcon = styled(ViewColumnIcon)`
  color: black;
`;

const GridViewIcon = styled(ViewCompactIcon)`
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

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const Avatars = styled(AvatarGroup)`
  margin-left: 5px;
`;

const Caption = styled.div`
  width: 625px;
  line-height: 1.2;
  margin-top: 10px;
  margin-bottom: 12px;
`;

const FoldComment = styled.span`
  margin-right: 2px;
  color: #999;
  cursor: pointer;
`;
const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 12px 0px;
  padding-bottom: 10px;
  border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

const CommentText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NonSubmit = styled.span`
  width: 30px;
  color: ${(props) => props.theme.lightGreyColor};
  cursor: pointer;
`;

const Submit = styled.span`
  width: 30px;
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
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

export default ({
  isLogin,
  user: { username, profile, isFollowing, isMember, isSelf },
  caption,
  files,
  follow,
  likes,
  isLiked,
  likeCount,
  toggleLike,
  mergedComments,
  newComment,
  onKeyPress,
  onSubmit,
  createdAt,
  foldComments,
  toggleFold,
  viewType,
  setViewType,
  toggleView,
}) => {
  const classes = useStyles();
  const foldCommentNumber = 4;

  // Initate view type
  if (files.length > 1 && viewType === 'SINGLE') {
    setViewType('SLIDE');
  }

  return (
    <Post>
      <Header>
        <ProfileWrapper>
          <ProfilePic size='small' url={profile} />
          <UserColumn>
            <NameWrapper>
              <Link to={`/${username}`}>
                <FatText text={username} />
              </Link>
              {isMember && <InfluencerBadge src={InfluencerIcon} />}
            </NameWrapper>
            <PictureCount>
              {files.length === 1 ? '1 picture' : `${files.length} pictures`}
            </PictureCount>
          </UserColumn>
        </ProfileWrapper>
        {!isSelf && !isFollowing && isLogin && (
          <FollowButton onClick={follow}>
            <FollowIcon />
          </FollowButton>
        )}
      </Header>

      {viewType === 'SINGLE' && files && (
        <Files>
          <File key={files[0].id} src={files[0].url} />
        </Files>
      )}
      {viewType === 'SLIDE' && (
        <SimpleImageSlider
          showBullets={true}
          width={648}
          height={648}
          images={files}
          navStyle={2}
        />
      )}
      {viewType === 'GRID' && (
        <GridList
          cellHeight={220}
          className={classes.gridList}
          cols={3}
          rows={3}
        >
          {files.map((file, index) => (
            <GridListTile
              key={file.id}
              cols={index % 3 === 0 ? 2 : 1}
              rows={index % 3 === 0 ? 2 : 1}
            >
              <img src={file.url} alt={'grid'} />
            </GridListTile>
          ))}
        </GridList>
      )}

      <Meta>
        <Buttons>
          <LikeButton color='secondary' onClick={toggleLike}>
            {isLiked ? <LikeIcon /> : <LikeEmptyIcon />}
          </LikeButton>
          <ViewButton onClick={toggleView}>
            {viewType === 'SINGLE' || viewType === 'SLIDE' ? (
              <Tooltip
                title={
                  viewType === 'SLIDE'
                    ? '이미지를 격자모양으로 볼 수 있어요'
                    : ''
                }
                placement='top'
                arrow
              >
                <GridViewIcon />
              </Tooltip>
            ) : (
              <Tooltip
                title={'이미지를 슬라이드로 볼 수 있어요'}
                placement='top'
                arrow
              >
                <SlideViewIcon />
              </Tooltip>
            )}
          </ViewButton>
          <Tooltip
            title={'다이렉트 메시지를 보내볼까요?'}
            placement='top'
            arrow
          >
            <MessageButton>
              <MessageIcon />
            </MessageButton>
          </Tooltip>
        </Buttons>

        <LikeWrapper>
          <FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
          <Avatars max={7}>
            {likes.map(
              (like) =>
                like.user.isMember && (
                  <Tooltip
                    key={like.user.username}
                    title={like.user.username}
                    placement='top'
                    arrow
                  >
                    <Avatar className={classes.small} src={like.user.profile} />
                  </Tooltip>
                )
            )}
          </Avatars>
        </LikeWrapper>

        <Caption>
          <FatText text={username} /> {caption}
        </Caption>

        {mergedComments.length > foldCommentNumber ? (
          foldComments === true ? (
            <FoldComment onClick={toggleFold}>
              댓글 {mergedComments.length}개 모두 보기
            </FoldComment>
          ) : (
            <FoldComment onClick={toggleFold}>댓글 닫기</FoldComment>
          )
        ) : (
          mergedComments.length > 0 && <Divider />
        )}

        {mergedComments && (
          <Comments>
            {mergedComments.map(
              (comment, index) =>
                ((foldComments &&
                  mergedComments.length - index <= foldCommentNumber) ||
                  !foldComments) && (
                  <Comment key={comment.id}>
                    <FatText text={comment.user.username} />
                    {comment.user.isMember && (
                      <InfluencerComment src={InfluencerIcon} />
                    )}
                    {comment.text}
                  </Comment>
                )
            )}
          </Comments>
        )}

        <Timestamp>{`${createdAt.split('T')[0]} ${
          createdAt.split('T')[1].split('.')[0]
        }`}</Timestamp>
        <CommentText>
          <Textarea
            onKeyPress={onKeyPress}
            placeholder={'댓글 달기...'}
            value={newComment.value}
            onChange={newComment.onChange}
          />
          {newComment.value === '' ? (
            <NonSubmit>게시</NonSubmit>
          ) : (
            <Submit onClick={onSubmit}>게시</Submit>
          )}
        </CommentText>
      </Meta>
    </Post>
  );
};
