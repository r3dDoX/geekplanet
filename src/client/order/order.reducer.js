import {
  ADDRESSES_LOADED,
  AGB_ACCEPTED,
  ORDER_FINISHED,
  PAYMENT_ERROR, PAYMENT_METHOD_SELECTED,
  PROCESSING_STARTED,
  SAVE_ADDRESS,
  SAVING_ADDRESS,
  SELECT_ADDRESS,
  SELECT_ORDER_STEP,
} from '../actions';

export const OrderSteps = {
  ADDRESS: 'address',
  AGB: 'agb',
  PAYMENT: 'payment',
  SUMMARY: 'summary',
  CONFIRMATION: 'confirmation',
};

const initialState = {
  address: undefined,
  addresses: [],
  selectedAddress: undefined,
  step: OrderSteps.ADDRESS,
  processing: false,
  paymentError: undefined,
  savingAddress: false,
};

export default function auth(state = initialState, { type, data }) {
  switch (type) {
    case SAVING_ADDRESS:
      return Object.assign({}, state, {
        savingAddress: true,
      });
    case SAVE_ADDRESS:
      return Object.assign({}, state, {
        address: data,
        step: OrderSteps.AGB,
        savingAddress: false,
      });
    case AGB_ACCEPTED:
      return Object.assign({}, state, {
        step: OrderSteps.PAYMENT,
      });
    case ADDRESSES_LOADED:
      return Object.assign({}, state, {
        addresses: data,
      });
    case SELECT_ADDRESS:
      return Object.assign({}, state, {
        selectedAddress: data,
      });
    case PAYMENT_METHOD_SELECTED:
      return Object.assign({}, state, {
        step: OrderSteps.SUMMARY,
      });
    case ORDER_FINISHED:
      return Object.assign({}, state, {
        step: OrderSteps.CONFIRMATION,
        processing: false,
        paymentError: undefined,
      });
    case SELECT_ORDER_STEP:
      return Object.assign({}, state, {
        step: data,
      });
    case PROCESSING_STARTED:
      return Object.assign({}, state, {
        processing: true,
      });
    case PAYMENT_ERROR:
      return Object.assign({}, state, {
        processing: false,
        paymentError: data,
      });
    default:
      return state;
  }
}
