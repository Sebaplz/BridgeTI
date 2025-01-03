import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authAction = createActionGroup({
  source: 'Auth Actions',
  events: {
    'Logout': emptyProps(),

    'Load Token': emptyProps(),
    'Load Token Success': props<{ token: string }>(),
    'Load Token Failure': props<{ error: any }>(),

    'Clear error': emptyProps(),
  },
});
