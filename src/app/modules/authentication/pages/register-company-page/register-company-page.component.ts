import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {PrimeTemplate} from "primeng/api";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {Store} from '@ngrx/store';
import {AuthStore} from '../../../../resources/stores/auth.store';
import {passwordValidator} from '../../core/utils/password-validator';
import {passwordsMatchValidator} from '../../core/utils/passwords-match-validator';
import {authReaction} from '../../../../library/reactions/auth.reaction';
import {authAction} from '../../../../global/actions/auth.action';
import {RegisterStudentIn} from '../../../../resources/io/auth/register-student.in';
import {RegisterCompanyIn} from '../../../../resources/io/auth/register-company.in';

@Component({
  selector: 'app-register-company-page',
  standalone: true,
    imports: [
        ButtonDirective,
        DividerModule,
        FloatLabelModule,
        InputTextModule,
        NgIf,
        PaginatorModule,
        PasswordModule,
        PrimeTemplate,
        ReactiveFormsModule,
        Ripple,
        RouterLink
    ],
  templateUrl: './register-company-page.component.html',
  styleUrl: './register-company-page.component.scss'
})
export class RegisterCompanyPageComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authStore = inject(Store<{ auth: AuthStore }>);
  errorMessage: string | null = null;

  registerCompanyForm = this.formBuilder.group({
    companyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    contactName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    contactPhone: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator(), Validators.maxLength(20)]],
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
    const {companyName, contactName, contactPhone, email, password} = this.registerCompanyForm.value as RegisterCompanyIn;
    this.authStore.dispatch(authReaction.registerCompany({companyName, contactName, contactPhone, email, password}));
  }
}
