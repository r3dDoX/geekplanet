import { createMuiTheme } from '@material-ui/core/styles'; // v1.x

export const backgroundColor = '#131E31';
export const brandPrimary = '#005B8E';
export const brandSecondary = '#27AAE1';
export const accent1Color = '#E74C3C';
export const accent2Color = '#ECF0F1';

export default createMuiTheme({
  fontFamily: 'PT Sans, sans-serif',
  palette: {
    primary: {
      main: brandPrimary,
      contrastText: accent2Color,
    },
    secondary: {
      main: accent1Color,
      contrastText: accent2Color,
    },
  },
});
