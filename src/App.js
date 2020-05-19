import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import Home from './pages/Home';
import LoggedOut from './pages/LoggedOut'
import Staff from './secure/Staff';
import MessageList from './components/MessageList';
import PublicInfo from './components/PublicInfo';
import Profile from './components/Profile';

// const REACT_APP_TEST = process.env.REACT_APP_TEST;

const OKTA_DOMAIN = process.env.REACT_APP_DOMAIN;
const OKTA_CLIENT_ID = process.env.REACT_APP_CLIENTID;

const config = {
  issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
  redirectUri: 'http://localhost:3000/implicit/callback',
  clientId: OKTA_CLIENT_ID,
  pkce: true
};

const App = () => { 
  return (
    <Router>
      <div>
        {/* Div: { REACT_APP_TEST } */}
      </div>
      <Security {...config}>
        <Route path='/' exact={true} component={Home}/>
        <Route path='/implicit/callback' component={LoginCallback}/>
        <Route path='/logged_out' component={LoggedOut} />
        <Route path='/api/publicInfo' component={PublicInfo} />
        <Route path='/api/profile' component={Profile} />
        <SecureRoute path='/staff' component={Staff} />
        <SecureRoute path='/api/messages' component={MessageList} />
      </Security>
    </Router>
  );
};

export default App;