import React from 'react';
import { FormattedMessage } from 'react-intl';

export const required = (value) => {
  if (!(value && value.length >= 1)) {
    return <FormattedMessage id="COMMON.FORM.REQUIRED" />;
  }

  return null;
};

export const requiredZIP = (value) => {
  if (!(value && Number(value) >= 1000 && Number(value) < 10000)) {
    return <FormattedMessage id="ORDER.ADDRESS.FORM.REQUIRED_ZIP" />;
  }

  return null;
};
