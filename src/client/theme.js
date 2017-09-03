import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const backgroundColor = '#131E31';
export const brandPrimary = '#005B8E';
export const brandSecondary = '#27AAE1';
export const accent1Color = '#E74C3C';
export const accent2Color = '#ECF0F1';

export const xsMaxSize = '659px';
export const mdMinSize = '660px';

export default getMuiTheme({
  fontFamily: 'PT Sans, sans-serif',
  palette: {
    primary1Color: backgroundColor,
    accent1Color,
    accent2Color,
  },
});
