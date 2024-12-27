import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Button, ButtonDirective} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {Ripple} from 'primeng/ripple';
import {Store} from '@ngrx/store';
import {NgIf} from '@angular/common';
import {authAction} from '../../../../global/actions/auth.action';
import {RouterLink} from '@angular/router';
import {AuthStore} from '../../../../resources/stores/auth.store';
import {authReaction} from '../../../../library/reactions/auth.reaction';
import {PasswordModule} from 'primeng/password';
import {passwordValidator} from '../../core/utils/passwordValidator';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [
    DividerModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    CheckboxModule,
    ButtonDirective,
    Ripple,
    NgIf,
    RouterLink,
    PasswordModule,
    FormsModule,
    Button
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit, OnDestroy{
  private readonly formBuilder = inject(FormBuilder);
  authStore = inject(Store<{ auth: AuthStore }>);
  errorMessage: string | null = null;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator(), Validators.maxLength(20)]],
    rememberMe: [false]
  });

  ngOnInit(): void {
    this.authStore.select(state => state.auth).subscribe(auth => {
      if (auth.error) {
        this.errorMessage = auth.error;
      }
    });
  }

  ngOnDestroy(): void {
    this.authStore.dispatch(authAction.clearError());
  }

  onSubmit(): void {
    const {email, password, rememberMe} = this.loginForm.value;
    /*TODO: Validar el ts*/
    // @ts-ignore
    this.authStore.dispatch(authReaction.login({email, password, rememberMe}));
  }

}
