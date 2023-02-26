import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import theme from '../styles/theme';

const NavIcon = ({
  focused = true,
  name,
  color = theme.blackColor,
  size = 30,
  style,
}) => (
  <Ionicons
    name={name}
    color={focused ? color : theme.darkGreyColor}
    size={size}
    style={style}
  />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool,
};

export default NavIcon;
