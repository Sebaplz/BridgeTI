import {AuthStore} from '../../../../resources/stores/auth.store';
import {createReducer, on} from '@ngrx/store';
import {authReaction} from '../../../../library/reactions/auth.reaction';
import {authAction} from '../../../../global/actions/auth.action';

export const authInitialState: AuthStore = {
  email: null,
  role: null,
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
    (state, { email, token, role, rememberMe }): AuthStore =>
      ({ ...state, loading: false, email, token, role, check: true, isLoggedIn: true, rememberMe})),

  on(authReaction.loginFail,
    (state, { error }): AuthStore =>
      ({ ...state, loading: false, check: true, error })),

  on(authAction.loadToken,
    (): AuthStore =>
      (authInitialState)),

  on(authAction.loadTokenSuccess,
    (state, { token, role, email }): AuthStore =>
      ({ ...state, loading: false, token, role, email, check: true, isLoggedIn: true })),

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

  on(authReaction.registerCompany,
    (): AuthStore =>
      (authInitialState)),

  on(authReaction.registerCompanySuccess,
    (state): AuthStore =>
      ({ ...state, loading: false, check: true })),

  on(authReaction.registerCompanyFail,
    (state, { error }): AuthStore =>
      ({ ...state, loading: false, check: true, error })),

  on(authAction.clearError, (state) => ({
    ...state,
    error: null,
  })),
);
