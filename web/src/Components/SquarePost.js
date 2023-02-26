import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { IconButton, Tooltip } from '@material-ui/core';
import {
  HeartFullIcon,
  CommentFullIcon,
  ProfileIcon,
} from '../Resources/Icons/Icons';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s linear;
  svg {
    fill: white;
  }
`;

const Container = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
  margin-right: 20px;
`;

export const REGISTER_PROFILE = gql`
  mutation registerProfile($url: String!) {
    registerProfile(url: $url)
  }
`;

const SquarePost = ({ likeCount, commentCount, file, mine = false }) => {
  const registerProfileMutation = useMutation(REGISTER_PROFILE, {
    variables: { url: file.url },
  });

  const registerProfile = () => {
    try {
      registerProfileMutation();
      toast.success('프로필 사진으로 등록했어요!');
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <Container bg={file.url}>
      <Overlay>
        <Number>
          <HeartFullIcon />
          <NumberText>{likeCount}</NumberText>
        </Number>
        <Number>
          <CommentFullIcon />
          <NumberText>{commentCount}</NumberText>
        </Number>
        {mine && (
          <Tooltip
            title={'프로필 사진으로 등록할 수 있어요!'}
            placement='top'
            arrow
          >
            <IconButton
              color='default'
              component='span'
              onClick={registerProfile}
            >
              <ProfileIcon />
            </IconButton>
          </Tooltip>
        )}
      </Overlay>
    </Container>
  );
};

SquarePost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.object.isRequired,
};

export default SquarePost;
