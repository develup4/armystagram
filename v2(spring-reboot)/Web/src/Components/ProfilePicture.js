import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const getSize = (size) => {
  let number;
  if (size === 'small') {
    number = 30;
  } else if (size === 'middle') {
    number = 50;
  } else if (size === 'large') {
    number = 150;
  }
  return `
        width:${number}px;
        height:${number}px;
        `;
};

const ProfileContainer = styled.div`
  ${(props) => getSize(props.size)}
  background-image:url(${(props) => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const ProfilePicture = ({ size = 'small', url, className }) => (
  <ProfileContainer className={className} size={size} url={url} />
);

ProfilePicture.propTypes = {
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  url: PropTypes.string.isRequired,
};

export default ProfilePicture;
