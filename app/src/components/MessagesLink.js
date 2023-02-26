import React from 'react';
import styled from 'styled-components';
import { withNavigation } from '@react-navigation/compat';
import NavIcon from './NavIcon';

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;

export default withNavigation(({ navigation, style, size = 30 }) => (
  <Container onPress={() => navigation.navigate('MessageNavigation')}>
    <NavIcon name={'ios-send'} size={size} style={style} />
  </Container>
));
