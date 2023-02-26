import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import dimensions from '../../styles/dimensions';
import PropTypes from 'prop-types';

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${(props) => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${dimensions.width / 4}px;
  height: ${dimensions.height / 20}px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const LogOutButton = ({ text, onPress, loading = false }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container>
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <Text
          style={{
            fontFamily: 'NanumGothicExtraBold',
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {text}
        </Text>
      )}
    </Container>
  </Touchable>
);

LogOutButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default LogOutButton;
