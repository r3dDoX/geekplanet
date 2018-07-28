import React from 'react';
import { shallow } from 'enzyme';
import { AuthorizedComponent } from './authorized';

describe('AuthorizedComponent', () => {
  let props;
  const authorized = children => shallow(
    <AuthorizedComponent {...props}>
      {children}
    </AuthorizedComponent>
  );

  beforeEach(() => {
    props = {
      allowedRoles: [],
      roles: [],
    };
  });

  it('should render given children when at least one given role matches allowedRoles', () => {
    props.allowedRoles.push('admin', 'author');
    props.roles.push('admin');

    const result = authorized(<i />);

    expect(result.type()).toBe('i');
  });

  it('should not render given children when none of the given roles match any allowedRoles', () => {
    props.allowedRoles.push('admin');
    props.roles.push('someRole', 'someOtherRole');

    const result = authorized(<i />);

    expect(result.type()).toBe(null);
  });
});
