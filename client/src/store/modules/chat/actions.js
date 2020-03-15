import client from '../../../network';
import {Message} from './constants';

import {
  FetchMessagesRequest, FetchMessagesSuccess, FetchMessagesFailure,
} from './constants';

export function fetchMessages() {
  return (dispatch, getState) => {
    dispatch({type: FetchMessagesRequest});
    
    const state = getState();
    const token = state.auth.token;
    
    client.get('/api/messages', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      dispatch({type: FetchMessagesSuccess, messages: response.data.messages});
    }).catch(error => {
      dispatch({type: FetchMessagesFailure, error: error.response.data.error});
    });
  }
}

export function sendMessage(message) {
  return { type: Message, message };
}
