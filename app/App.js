import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthProvider } from './src/commons/AuthContext';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import theme from './src/styles/theme';
import { ThemeProvider } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import MainNavigation from './src/navigation/MainNavigation';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // Load pre-ready resources
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
        nanum: require('./assets/Fonts/NanumFont/NanumBarunGothic.ttf'),
        HelveticaNeueBd: require('./assets/Fonts/HelveticaNeue/HelveticaNeueLTPro-Bd.otf'),
        HelveticaNeueBlk: require('./assets/Fonts/HelveticaNeue/HelveticaNeueLTPro-Blk.otf'),
        HelveticaNeueCn: require('./assets/Fonts/HelveticaNeue/HelveticaNeueLTPro-Cn.otf'),
        HelveticaNeueHv: require('./assets/Fonts/HelveticaNeue/HelveticaNeueLTPro-Hv.otf'),
        HelveticaNeueLt: require('./assets/Fonts/HelveticaNeue/HelveticaNeueLTPro-Lt.otf'),
        HelveticaNeueMd: require('./assets/Fonts/HelveticaNeue/HelveticaNeueLTPro-Md.otf'),
        HelveticaNeueRoman: require('./assets/Fonts/HelveticaNeue/HelveticaNeueLTPro-Roman.otf'),
        HelveticaNeueTh: require('./assets/Fonts/HelveticaNeue/HelveticaNeueLTPro-Th.otf'),
        HelveticaNeueUltLt: require('./assets/Fonts/HelveticaNeue/HelveticaNeueLTPro-UltLt.otf'),
        NanumBarunGothic: require('./assets/Fonts/NanumFont/NanumBarunGothic.ttf'),
        NanumGothic: require('./assets/Fonts/NanumFont/NanumGothic.ttf'),
        NanumGothicBold: require('./assets/Fonts/NanumFont/NanumGothicBold.ttf'),
        NanumGothicExtraBold: require('./assets/Fonts/NanumFont/NanumGothicExtraBold.ttf'),
        NanumGothicLight: require('./assets/Fonts/NanumFont/NanumGothicLight.ttf'),
        NanumPen: require('./assets/Fonts/NanumFont/NanumPen.ttf'),
        NanumSquareB: require('./assets/Fonts/NanumFont/NanumSquareB.ttf'),
        NanumSquareL: require('./assets/Fonts/NanumFont/NanumSquareL.ttf'),
        NanumSquareRoundL: require('./assets/Fonts/NanumFont/NanumSquareRoundL.ttf'),
      });
      await Asset.loadAsync([require('./assets/Images/default.png')]);
      await Asset.loadAsync([require('./assets/Images/influencer.png')]);
      await Asset.loadAsync([require('./assets/Images/logo.png')]);
      await Asset.loadAsync([require('./assets/Images/BTS_Logo.png')]);

      // Make caches and local storage like browser
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        request: async (operation) => {
          const token = await AsyncStorage.getItem('jwt');
          console.log('useToken : ', token);
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` },
          });
        },
        uri: 'https://armystagram-backend.herokuapp.com',
      });

      // Load if logged in or not and provide auth provider
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (!isLoggedIn || isLoggedIn === 'false') {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setClient(client);
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <MainNavigation />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
