import {HttpProvider} from '../../resources/core/provider-core';
import {Observable} from 'rxjs';
import {LoginIn} from '../../resources/io/auth/login.in';
import {LoginOut} from '../../resources/io/auth/login.out';
import {RegisterStudentOut} from '../../resources/io/auth/register-student.out';
import {RegisterStudentIn} from '../../resources/io/auth/register-student.in';
import {RegisterCompanyIn} from '../../resources/io/auth/register-company.in';
import {RegisterCompanyOut} from '../../resources/io/auth/register-company.out';

export class AuthProvider extends HttpProvider{
  constructor() {
    super('auth');
  }

  login(params: LoginIn): Observable<LoginOut> {
    return this.post<LoginOut>('/login', params);
  }

  registerStudent(params: RegisterStudentIn): Observable<RegisterStudentOut> {
    return this.post<RegisterStudentOut>('/register/student', params);
  }

  registerCompany(params: RegisterCompanyIn): Observable<RegisterCompanyOut> {
    return this.post<RegisterCompanyOut>('/register/company', params);
  }
}
