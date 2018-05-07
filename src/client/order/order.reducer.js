import {
  ADDRESSES_LOADED,
  AGB_ACCEPTED,
  ORDER_FINISHED,
  PAYMENT_ERROR,
  PAYMENT_METHOD_SELECTED,
  PROCESSING_STARTED,
  SAVE_ADDRESS,
  SAVING_ADDRESS,
  SELECT_ADDRESS,
  SELECT_ORDER_STEP,
} from '../actions';
import OrderSteps from './orderSteps';

const initialState = {
  address: undefined,
  addresses: [],
  selectedAddress: undefined,
  step: OrderSteps.ADDRESS,
  processing: false,
  paymentError: undefined,
};

export default function auth(state = initialState, { type, data }) {
  switch (type) {
    case SAVING_ADDRESS:
      return Object.assign({}, state, {
        processing: true,
      });
    case SAVE_ADDRESS:
      return Object.assign({}, state, {
        address: data,
        step: OrderSteps.AGB,
        processing: false,
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
        processing: false,
      });
    case ORDER_FINISHED:
      return Object.assign({}, state, {
        step: OrderSteps.CONFIRMATION,
        paymentError: undefined,
        processing: false,
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
        step: OrderSteps.PAYMENT,
        processing: false,
        paymentError: data,
      });
    default:
      return state;
  }
}
