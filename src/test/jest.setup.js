import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

window.AUTH = {
  CLIENT_ID: 'clientId',
};

window.ORDER = {
  MIN_PRICE_SHIPPING: 50,
  SHIPPING_COST: 9,
};
