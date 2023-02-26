import React from 'react';
import styled from 'styled-components';
import { useIsLoggedIn } from '../../commons/AuthContext';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const isLogin = useIsLoggedIn();
  console.log(isLogin);

  navigation.navigate('AuthNavigation');

  return (
    <View>
      <Text>Notifications</Text>
    </View>
  );
};
