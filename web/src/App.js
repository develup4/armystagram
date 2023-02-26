import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Styles/GlobalStyles';
import Theme from './Styles/Theme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feed from './Routes/Feed';
import Search from './Routes/Search';
import Message from './Routes/Message';
import Auth from './Routes/Auth';
import { Profile, OtherProfile } from './Routes/Profile/Profile';

export default () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Feed} />
            <Route path='/search' component={Search} />
            <Route path='/message' component={Message} />
            <Route path='/auth' component={Auth} />
            <Route path='/profile' component={Profile} />
            <Route path='/:username' component={OtherProfile} />
            <Redirect from='*' to='/' />
          </Switch>
        </HashRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
