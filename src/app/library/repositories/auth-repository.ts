import { Injectable } from '@angular/core';
import {AuthProvider} from '../providers/auth-provider';
import {LoginIn} from '../../resources/io/auth/login.in';
import {RegisterStudentIn} from '../../resources/io/auth/register-student.in';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  protected readonly authProvider = new AuthProvider();
  constructor() { }

  login(params: LoginIn) {
    return this.authProvider.login(params);
  }

  registerStudent(params: RegisterStudentIn) {
    return this.authProvider.registerStudent(params);
  }
}
