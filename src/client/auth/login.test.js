import React from 'react';
import { shallow } from 'enzyme';
import Redirect from 'react-router-dom/Redirect';
import { LoginComponent } from './login';
import { load, store, ids } from '../storage';
import authService from './authService';
import LoginForm from './loginForm';

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

    expect(result.last().type()).toBe(LoginForm);
  });

  it('should call handleAuthentication when logged out and access_token in hash', () => {
    props.location.hash = '?access_token=12345';
    authService.handleAuthentication = jest.fn();
    authService.loggedIn = () => false;

    login();

    expect(authService.handleAuthentication.mock.calls.length).toBe(1);
    expect(authService.handleAuthentication.mock.calls[0][0]).toBe(props.loggedIn);
  });

  it('should call handleAuthentication when logged out and id_token in hash', () => {
    props.location.hash = '?id_token=12345';
    authService.handleAuthentication = jest.fn();
    authService.loggedIn = () => false;

    login();

    expect(authService.handleAuthentication.mock.calls.length).toBe(1);
  });

  it('should call handleAuthentication when logged out and error in hash', () => {
    props.location.hash = '?error=12345';
    authService.handleAuthentication = jest.fn();
    authService.loggedIn = () => false;

    login();

    expect(authService.handleAuthentication.mock.calls.length).toBe(1);
  });

  it('should not call handleAuthentication when logged out and neither access_token, nor id_token nor error in hash', () => {
    props.location.hash = '?someArg=blubb';
    authService.handleAuthentication = jest.fn();
    authService.loggedIn = () => false;

    login();

    expect(authService.handleAuthentication.mock.calls.length).toBe(0);
  });

  it('should not call handleAuthentication when logged in', () => {
    props.location.hash = '?access_token=asdf';
    authService.handleAuthentication = jest.fn();
    authService.loggedIn = () => true;

    login();

    expect(authService.handleAuthentication.mock.calls.length).toBe(0);
  });
});
