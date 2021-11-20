import React from 'react';
import { View, Image } from 'react-native';
import theme from '../styles/theme';
import dimensions from '../styles/dimensions';
import NavIcon from '../components/NavIcon';
import MessageLink from '../components/MessagesLink';
import { ProgressBar, Colors } from 'react-native-paper';
import { Divider } from 'react-native-paper';

const Header = ({ loading }) => (
  <View style={{ marginTop: 25, backgroundColor: '#FAFAFA' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <NavIcon
        name={'logo-instagram'}
        size={36}
        style={{ margin: 5, paddingTop: 2, marginLeft: 15 }}
      />
      <Image
        style={{
          width: dimensions.width / 4,
          height: dimensions.width / 17,
          marginTop: 5,
        }}
        source={require('../../assets/Images/logo.png')}
      />
      <MessageLink
        style={{ marginLeft: dimensions.width / 1.85, marginTop: 5 }}
      />
    </View>
    {loading === true ? (
      <ProgressBar indeterminate={true} color={Colors.red800} />
    ) : (
      <Divider style={{ marginTop: 3 }} />
    )}
  </View>
);

export default Header;
