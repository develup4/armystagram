import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// For using functions about login in children
export const AuthContext = createContext();

// Receive if logged in or not from App
export const AuthProvider = ({ isLoggedIn: isLoggedInProps, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProps);

  const logUserIn = async (token) => {
    console.log('login token :', token);

    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('jwt', token);

      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      await AsyncStorage.setItem('jwt', '');
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  // Provide to children by HOC
  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Provide as hooks
export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};
