import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const authReaction = createActionGroup({
  source: 'Auth Reactions',
  events: {
    'Login': props<{ email: string, password: string, rememberMe: boolean }>(),
    'Login Success': props<{ email: string, token: string, rememberMe: boolean }>(),
    'Login Fail': props<{ error: any }>(),

    'Register': props<{ name: string, rut: string, firstLastName: string, secondLastName: string, email: string, password: string }>(),
    /*TODO: Nunca llega acá porque llamo a la acción de login*/
    'Register Success': emptyProps(),
    'Register Fail': props<{ error: any }>(),

    'Register Company': props<{ companyName: string, contactName: string, contactPhone: string, email: string, password: string }>(),
    /*TODO: Nunca llega acá porque llamo a la acción de login*/
    'Register Company Success': emptyProps(),
    'Register Company Fail': props<{ error: any }>(),
  },
});
