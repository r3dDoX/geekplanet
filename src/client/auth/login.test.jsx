import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { Login } from './login.jsx';
import { load, store, ids } from '../storage';
import MainSpinner from '../layout/mainSpinner.jsx';

describe('Login', () => {
  let props;
  const login = () => shallow(
    <Login {...props} />
  );

  beforeEach(() => {
    props = {
      authService: {
        login: () => {},
        loggedIn: () => {},
      },
      location: {
        from: undefined,
        hash: '',
      },
    };
  });

  it('should save last location when not logged in', () => {
    props.authService.loggedIn = () => false;
    props.location.from = { pathname: '/testPath' };

    login();

    expect(load(ids.REDIRECT_URI)).toBe(props.location.from.pathname);
  });

  it('should save home location when no from given', () => {
    props.authService.loggedIn = () => false;

    login();

    expect(load(ids.REDIRECT_URI)).toBe('/');
  });

  it('should render MainSpinner when not logged in', () => {
    props.authService.loggedIn = () => false;

    const result = login();

    expect(result.type()).toBe(MainSpinner);
  });

  it('should render Redirect to stored path when logged in', () => {
    const redirectUri = '/someTestPath';
    store(ids.REDIRECT_URI, redirectUri);
    props.authService.loggedIn = () => true;

    const result = login();

    expect(result.type()).toBe(Redirect);
    expect(result.props().to).toEqual({ pathname: redirectUri });
  });
});
