import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const authReaction = createActionGroup({
  source: 'Auth Reactions',
  events: {
    'Login': props<{ email: string, password: string, rememberMe: boolean }>(),
    'Login Success': props<{ email: string, token: string, rememberMe: boolean }>(),
    'Login Fail': props<{ error: any }>(),

    'Register': props<{ name: string, firstLastName: string, secondLastName: string, email: string, password: string }>(),
    'Register Success': emptyProps(),
    'Register Fail': props<{ error: any }>(),
  },
});
