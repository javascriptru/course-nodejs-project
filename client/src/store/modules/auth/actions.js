import client from '../../../network';

import {
  LoginRequest, LoginSuccess, LoginFailure,
  RegisterRequest, RegisterSuccess, RegisterFailure,
  ConfirmRequest, ConfirmSuccess, ConfirmFailure,
  OAuthRequest, OAuthFailure,
  OAuthCallbackRequest, OAuthCallbackSuccess, OAuthCallbackFailure,
  FetchMeRequest, FetchMeSuccess, FetchMeFailure,
} from './constants';

export function login({email, password}) {
  return (dispatch, getState) => {
    dispatch({type: LoginRequest});
    
    client.post('/api/login', {
      email, password
    }).then(response => {
      dispatch({type: LoginSuccess, token: response.data.token});
    }).catch(error => {
      dispatch({type: LoginFailure, error: error.response.data.error});
    });
  }
}

export function register({email, displayName, password}) {
  return (dispatch, getState) => {
    dispatch({type: RegisterRequest});
    
    client.post('/api/register', {
      email, displayName, password
    }).then(response => {
      dispatch({type: RegisterSuccess});
    }).catch(error => {
      dispatch({type: RegisterFailure, errors: error.response.data.errors});
    });
  }
}

export function confirm({verificationToken}) {
  return (dispatch, getState) => {
    dispatch({type: ConfirmRequest});
    
    client.post('/api/confirm', {
      verificationToken
    }).then(response => {
      dispatch({type: ConfirmSuccess, token: response.data.token});
    }).catch(error => {
      dispatch({type: ConfirmFailure, error: error.response.data.error});
    });
  }
}

export function oauth({provider}) {
  return (dispatch, getState) => {
    dispatch({type: OAuthRequest});
    
    client.get(`/api/oauth/${provider}`)
      .then(response => {
        window.location.href = response.data.location;
      })
      .catch(error => {
        dispatch({type: OAuthFailure, error: error.response.data.error});
      });
  }
}

export function oauthCallback({provider, code}) {
  return (dispatch, getState) => {
    dispatch({type: OAuthCallbackRequest});
    
    client.post('/api/oauth_callback', {
      provider
    }, {
      params: { code }
    }).then(response => {
      dispatch({type: OAuthCallbackSuccess, token: response.data.token});
    }).catch(error => {
      dispatch({type: OAuthCallbackFailure, error: error.response.data.error});
    });
  }
}

export function fetchMe() {
  return (dispatch, getState) => {
    const state = getState();
    
    if (state.auth.me.fetching || !!state.auth.me.profile) return;
    
    dispatch({type: FetchMeRequest});
    
    const token = state.auth.token;
    
    client.get('/api/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      dispatch({type: FetchMeSuccess, profile: response.data});
    }).catch(error => {
      dispatch({type: FetchMeFailure, error: error.response.data.error});
    });
  }
}
