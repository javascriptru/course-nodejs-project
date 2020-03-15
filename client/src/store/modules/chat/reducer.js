import {
  FetchMessagesSuccess,
  WebsocketConnected, WebsocketDisconnected,
  Message,
} from './constants';

const initialState = {
  isWebsocketConnected: false,
  messages: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FetchMessagesSuccess:
      return {
        ...state,
        messages: action.messages.concat(state.messages),
      };
    case WebsocketConnected:
      return { ...state, isWebsocketConnected: true };
    case WebsocketDisconnected:
      return { ...state, isWebsocketConnected: false };
    case Message:
      return {
        ...state,
        messages: state.messages.concat(action.message),
      };
    default:
      return state;
  }
}
