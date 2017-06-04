import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { LoginComponent } from './login.jsx';
import { load, store, ids } from '../storage';
import MainSpinner from '../layout/mainSpinner.jsx';

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

  it('should call login asynchronously when not logged in and not in login process', (done) => {
    props.authService.loggedIn = () => false;
    props.authService.login = () => done();

    login();
  });

  it('should not call login when in login process', (done) => {
    props.authService.loggedIn = () => false;
    props.location.hash = 'test&id_token=test';
    props.authService.login = jest.fn();

    login();

    setTimeout(() => {
      try {
        expect(props.authService.login.mock.calls.length).toBe(0);
      } catch (e) {
        done.fail(e);
      }
      done();
    }, 1);
  });
});
