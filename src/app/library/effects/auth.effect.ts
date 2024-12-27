import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, of, tap} from 'rxjs';
import {AuthorizationService} from '../../global/services/authorization.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {authAction} from '../../global/actions/auth.action';
import {MessageService} from 'primeng/api';
import {authReaction} from '../reactions/auth.reaction';
import {AuthRepository} from '../repositories/auth-repository';

@Injectable()
export class AuthEffect {
  private readonly actions$ = inject(Actions);
  private readonly authorizationService = inject(AuthorizationService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly authRepository = inject(AuthRepository);

  constructor() {}

  loadToken = createEffect(() =>
      this.actions$.pipe(
        ofType(authAction.loadToken),
        exhaustMap(() => {
            const token = this.authorizationService.getTokenStorage;
            if (token) {
              return of(authAction.loadTokenSuccess({ token }));
            }else{
              return of(authAction.loadTokenFailure({error: 'No existe sesión'}));
            }
          }
        )
      ),
    { functional: true }
  );

  login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(authReaction.login),
        mergeMap(action =>
          this.authRepository.login({
            email: action.email,
            password: action.password
          }).pipe(
            map(response => {
              if(action.rememberMe) {
                this.authorizationService.saveToken(response.token);
              }else{
                this.authorizationService.saveSessionToken(response.token);
              }
              return authReaction.loginSuccess({
                email: action.email,
                token: response.token,
                rememberMe: action.rememberMe
              });
            }),
            catchError(err => {
              const errorMessage = err.error.error || 'An unexpected error occurred';
              return of(authReaction.loginFail({ error: errorMessage }));
            })
          )
        )
      ),
    { functional: true }
  );

  loginRedirect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(authReaction.loginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(authAction.logout),
        tap(() => {
          this.authorizationService.logout();
          this.router.navigate(['/auth/login']);
          this.messageService.add({
            severity: 'success',
            summary: 'Logout Success',
            detail: 'You have been logged out successfully.',
          });
        })
      ),
    { dispatch: false, functional: true }
  );

  registerStudent$ = createEffect(() =>
      this.actions$.pipe(
        ofType(authReaction.register),
        mergeMap((action) =>
          this.authRepository.registerStudent({
            email: action.email,
            password: action.password,
            name: action.name,
            rut: action.rut,
            firstLastName: action.firstLastName,
            secondLastName: action.secondLastName,
          }).pipe(
            map(() => {
              return authReaction.login({
                email: action.email,
                password: action.password,
                rememberMe: false
              });
            }),
            catchError(err => {
              if(err.status === 409) {
                const errorMessage = "User with this email already exists";
                return of(authReaction.registerFail({ error: errorMessage }));
              }
              return of(authReaction.registerFail({ error: 'An unexpected error occurred' }));
            })
          )
        )
      ),
    { functional: true }
  );

  clearError$ = createEffect(()=>
    this.actions$.pipe(
      ofType(authAction.clearError),
      tap(()=>{
        console.log("Se limpio el error")
      })
    ),
    { dispatch: false }
  );
}
