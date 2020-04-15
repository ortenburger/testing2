import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

// COMPONENTS
import StartContent from './components/03-organisms/StartContent';
import Navigation from './components/02-molecules/Navigation';
import MainContent from './components/03-organisms/MainContent';
import Footer from './components/01-atoms/surfaces/Footer';
import FooterContent from './components/03-organisms/FooterContent';

import LogIn from './components/02-molecules/LogIn';
import SignUp from './components/02-molecules/SignUp';
import ForgotPassword from './components/02-molecules/ForgotPassword';

// DATA
import i18nGerman from './data/i18n-de.json';
import i18nEnglish from './data/i18n-en.json';

// MATERIAL UI - CORE

const userIsLoggedIn = false;

const language = 'de';
const selectedLanguage = language !== 'en' ? i18nGerman : i18nEnglish;

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <br />
      <br />
      <br />
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 1000); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 1000);
  },
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/log-in',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function App() {
  return (
    <>
      <Switch>
        <StartContent i18n={selectedLanguage} fakeAuth={fakeAuth} />

        <PrivateRoute path='/protected'>
          <Navigation i18n={selectedLanguage} />
          <MainContent i18n={selectedLanguage} />
          <AuthButton />
        </PrivateRoute>

        {/* <Footer i18n={selectedLanguage} />
        <FooterContent i18n={selectedLanguage} /> */}
      </Switch>
    </>
  );
}

// TO DO:

// 1. Show Navigation component only if user is logged in
// 2. Create protected routes for main content
// 3. Redirect to LogIn component if user is logged out
// 4. Create 404 page if URL doesn't match

// PROBLEMS / BUGS:

// 1. LogIn component should always show first when not logged in
// 2. FooterContet doesn't show when clicking respective links
