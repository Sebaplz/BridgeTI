import {AuthStore} from '../../../../resources/stores/auth.store';
import {createReducer, on} from '@ngrx/store';
import {authReaction} from '../../../../library/reactions/auth.reaction';
import {authAction} from '../../../../global/actions/auth.action';

export const authInitialState: AuthStore = {
  email: null,
  token: null,
  check: false,
  loading: true,
  isLoggedIn: false,
  error: null,
  rememberMe: false,
}

export const authReducer = createReducer(
  authInitialState,
  on(authReaction.login,
    (): AuthStore =>
      (authInitialState)),
  on(authReaction.loginSuccess,
    (state, { email, token, rememberMe }): AuthStore =>
      ({ ...state, loading: false, email, token, check: true, isLoggedIn: true, rememberMe})),

  on(authReaction.loginFail,
    (state, { error }): AuthStore =>
      ({ ...state, loading: false, check: true, error })),

  on(authAction.loadToken,
    (): AuthStore =>
      (authInitialState)),

  on(authAction.loadTokenSuccess,
    (state, { token }): AuthStore =>
      ({ ...state, loading: false, token, check: true, isLoggedIn: true })),

  on(authAction.loadTokenFailure,
    (state): AuthStore =>
      ({ ...state, loading: false, check: true })),

  on(authAction.logout,
    (): AuthStore =>
      (authInitialState)),

  on(authReaction.register,
    (): AuthStore =>
      (authInitialState)),

  on(authReaction.registerSuccess,
    (state): AuthStore =>
      ({ ...state, loading: false, check: true })),

  on(authReaction.registerFail,
    (state, { error }): AuthStore =>
      ({ ...state, loading: false, check: true, error })),

  on(authAction.clearError, (state) => ({
    ...state,
    error: null,
  })),
);
