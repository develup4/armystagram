import React from 'react';
import styled from 'styled-components';
import dimensions from '../../styles/dimensions';
import PropTypes from 'prop-types';

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${dimensions.width / 1.7}px;
  height: ${dimensions.height / 20}px;
  padding: 10px;
  background-color: ${(props) => props.theme.greyColor};
  border: 0.5px solid ${(props) => props.theme.darkGreyColor};
  border-radius: 2px;
  font-family: NanumSquareRoundL;
  font-size: 12px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = 'default',
  autoCapitalize = 'none',
  returnKeyType = 'done',
  onChange,
  onSubmitEditing = () => null,
  autoCorrect = true,
  password = false,
}) => (
  <Container>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      autoCorrect={autoCorrect}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      autoCapitalize={autoCapitalize}
      onSubmitEditing={onSubmitEditing}
      secureTextEntry={password}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
};

export default AuthInput;
