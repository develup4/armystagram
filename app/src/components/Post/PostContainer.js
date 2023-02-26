import React, { useState } from 'react';
import { withNavigation } from '@react-navigation/compat';
import { ToastAndroid } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';
import { FOLLOW } from '../../commons/SharedQueries';
import { useIsLoggedIn } from '../../commons/AuthContext';
import useInput from '../../components/hooks/useInput';
import PostPresenter from './PostPresenter';

const Post = ({
  id,
  user,
  caption,
  files = [],
  likes,
  likeCount,
  isLiked,
  comments = [],
  createdAt,
  navigation,
}) => {
  // Login
  const isLogin = useIsLoggedIn();

  // Like
  const [isLikedState, setIsLiked] = useState(isLiked);
  const [likeCountState, setLikeCount] = useState(likeCount);

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
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

  // Comment
  const comment = useInput('');
  const [selfComments, setSelfComments] = useState([]);

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });

  const onSubmit = async () => {
    if (!isLogin) {
      ToastAndroid.show('로그인이 필요해요', ToastAndroid.BOTTOM);
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
      ToastAndroid.show('일시적인 오류가 발생했어요 ㅠ', ToastAndroid.BOTTOM);
    }
  };

  const mergedComments = [...comments, ...selfComments];

  // Follow button
  const followMutation = useMutation(FOLLOW, { variables: { id: user.id } });
  const follow = () => {
    followMutation[0]();
    user.isFollowing = true;

    ToastAndroid.show(
      `${user.username} 님을 팔로우했어요!`,
      ToastAndroid.BOTTOM
    );
  };

  // Fold comment
  const [foldComments, setFoldComments] = useState(true);
  const toggleFold = () => {
    setFoldComments(!foldComments);
  };

  const informLoginNeeded = () => {
    ToastAndroid.show('로그인이 필요해요', ToastAndroid.BOTTOM);
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
      onSubmit={onSubmit}
      createdAt={createdAt}
      foldComments={foldComments}
      toggleFold={toggleFold}
      navigation={navigation}
    />
  );
};

export default withNavigation(Post);
