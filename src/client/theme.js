import { createMuiTheme } from '@material-ui/core/styles'; // v1.x

export const backgroundColor = '#131E31';
export const brandPrimary = '#005B8E';
export const brandSecondary = '#27AAE1';
export const accent1Color = '#E74C3C';
export const accent2Color = '#ECF0F1';

export const xsMaxSize = '768px';
export const mdMinSize = '769px';
export const mdMaxSize = '1023px';
export const laMinSize = '1024px';

export default createMuiTheme({
  fontFamily: 'PT Sans, sans-serif',
  palette: {
    primary: {
      main: backgroundColor,
    },
    secondary: {
      main: accent1Color,
      contrastText: accent2Color,
    },
  },
});
