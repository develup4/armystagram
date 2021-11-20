import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useInput } from '../Input';
import { useMutation } from 'react-apollo-hooks';
import { FOLLOW } from '../../Resources/SharedQueries/SharedQueries';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';
import { toast } from 'react-toastify';
import PostPresenter from './PostPresenter';

const PostContainer = ({
  isLogin,
  id,
  user,
  caption,
  files,
  likes,
  likeCount,
  isLiked,
  comments,
  createdAt,
}) => {
  // Like
  const [isLikedState, setIsLiked] = useState(isLiked);
  const [likeCountState, setLikeCount] = useState(likeCount);

  const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });

  const toggleLike = () => {
    toggleLikeMutation();

    // My 'like' is managed locally
    if (isLikedState === true) {
      setIsLiked(false);
      setLikeCount(likeCountState - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountState + 1);
    }
  };

  const informLoginNeeded = () => {
    toast.error('로그인이 필요해요');
  };

  // Comment
  const comment = useInput('');
  const [selfComments, setSelfComments] = useState([]);

  const addCommentMutation = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });

  const onKeyPress = async (event) => {
    const EnterKey = 13;
    const { which } = event;

    if (which === EnterKey) {
      if (!isLogin) {
        toast.error('로그인이 필요해요');
        comment.setValue('');
        return;
      }

      if (comment.value === '') {
        return;
      }

      event.preventDefault();
      try {
        const {
          data: { addComment },
        } = await addCommentMutation();

        // Comment display is updated locally
        setSelfComments([...selfComments, addComment]);
        comment.setValue('');
      } catch {
        toast.error('일시적인 오류가 발생했어요 ㅠ');
      }
    }
  };

  const onSubmit = async () => {
    if (!isLogin) {
      toast.error('로그인이 필요해요');
      comment.setValue('');
      return;
    }

    if (comment.value === '') {
      return;
    }

    try {
      const {
        data: { addComment },
      } = await addCommentMutation();

      // Comment display is updated locally
      setSelfComments([...selfComments, addComment]);
      comment.setValue('');
    } catch {
      toast.error('일시적인 오류가 발생했어요 ㅠ');
    }
  };

  const mergedComments = [...comments, ...selfComments];

  // Follow button
  const followMutation = useMutation(FOLLOW, { variables: { id: user.id } });
  const follow = () => {
    followMutation();
    user.isFollowing = true;
    toast.success(`${user.username} 님을 팔로우했어요!`);
  };

  // Fold comment
  const [foldComments, setFoldComments] = useState(true);
  const toggleFold = () => {
    setFoldComments(!foldComments);
  };

  // View tyle
  const [viewType, setViewType] = useState('SINGLE');
  const toggleView = () => {
    if (viewType === 'SLIDE') {
      setViewType('GRID');
    } else if (viewType === 'GRID') {
      setViewType('SLIDE');
    }
  };

  return (
    <PostPresenter
      isLogin={isLogin}
      user={user}
      caption={caption}
      follow={follow}
      files={files}
      likes={likes}
      isLiked={isLikedState}
      likeCount={likeCountState}
      toggleLike={isLogin ? toggleLike : informLoginNeeded}
      mergedComments={mergedComments}
      newComment={comment}
      onKeyPress={onKeyPress}
      onSubmit={onSubmit}
      createdAt={createdAt}
      foldComments={foldComments}
      toggleFold={toggleFold}
      viewType={viewType}
      setViewType={setViewType}
      toggleView={toggleView}
    />
  );
};

PostContainer.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    profile: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likes: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        isMember: PropTypes.bool.isRequired,
        username: PropTypes.string.isRequired,
        profile: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default PostContainer;
