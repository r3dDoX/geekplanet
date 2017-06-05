import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { LoginComponent } from './login.jsx';
import { load, store, ids } from '../storage';
import authService from './authService';
import LoginForm from './loginForm.jsx';

describe('LoginComponent', () => {
  let props;
  const login = () => shallow(
    <LoginComponent {...props} />
  );

  beforeEach(() => {
    props = {
      location: {
        from: undefined,
        hash: '',
      },
      loggedIn: () => {},
    };
  });

  it('should save last location when not logged in', () => {
    authService.loggedIn = () => false;
    props.location.from = { pathname: '/testPath' };

    login();

    expect(load(ids.REDIRECT_URI)).toBe(props.location.from.pathname);
  });

  it('should save home location when no from given', () => {
    authService.loggedIn = () => false;

    login();

    expect(load(ids.REDIRECT_URI)).toBe('/');
  });

  it('should render Redirect to stored path when logged in', () => {
    const redirectUri = '/someTestPath';
    store(ids.REDIRECT_URI, redirectUri);
    authService.loggedIn = () => true;

    const result = login();

    expect(result.type()).toBe(Redirect);
    expect(result.props().to).toEqual({ pathname: redirectUri });
  });

  it('should render LoginForm when not logged in', () => {
    authService.loggedIn = () => false;

    const result = login();

    expect(result.type()).toBe(LoginForm);
  });
});
