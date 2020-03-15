import {CheckoutFailure, CheckoutRequest, CheckoutSuccess} from './constants';
import client from '../../../network';

export function checkout(data) {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
  
    dispatch({type: CheckoutRequest, data});
    
    client.post('/api/orders', data, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(response => {
      dispatch({type: CheckoutSuccess, data, order: response.data.order});
    }).catch(error => {
      dispatch({type: CheckoutFailure, data, errors: error.response.data.errors});
    });
  };
}
