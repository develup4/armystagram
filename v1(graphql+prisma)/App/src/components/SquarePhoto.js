import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import dimensions from '../styles/dimensions';
import PropTypes from 'prop-types';

const SquarePhoto = ({ navigation, post, myProfile = false }) => (
  <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post })}>
    <Image
      source={{ uri: post.files[0].url }}
      style={{ width: dimensions.width / 3, height: dimensions.height / 6 }}
    />
  </TouchableOpacity>
);

SquarePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
};

export default withNavigation(SquarePhoto);
