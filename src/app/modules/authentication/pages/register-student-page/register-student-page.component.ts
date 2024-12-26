import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Ripple} from 'primeng/ripple';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {NgIf} from '@angular/common';
import {authAction} from '../../../../global/actions/auth.action';
import {passwordsMatchValidator} from '../../core/utils/passwordsMatchValidator';
import {AuthStore} from '../../../../resources/stores/auth.store';
import {authReaction} from '../../../../library/reactions/auth.reaction';
import {RegisterStudentIn} from '../../../../resources/io/auth/register-student.in';

@Component({
  selector: 'register-student-page',
  standalone: true,
  imports: [
    ButtonDirective,
    CheckboxModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    Ripple,
    RouterLink,
    NgIf
  ],
  templateUrl: './register-student-page.component.html',
  styleUrl: './register-student-page.component.scss'
})
export class RegisterStudentPageComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;
  private readonly formBuilder = inject(FormBuilder);
  private readonly authStore = inject(Store<{ auth: AuthStore }>);

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    firstLastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    secondLastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.required]]
  }, {validators: passwordsMatchValidator()});

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
    const {name, firstLastName, secondLastName, email, password} = this.registerForm.value as RegisterStudentIn;
    this.authStore.dispatch(authReaction.register({name, firstLastName, secondLastName, email, password}));
  }
}
