import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResultModel } from './model/LoginResultModel';
import { CustomerModel } from './model/customer';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<LoginResultModel> {
    return this.http.post<LoginResultModel>('https://reqres.in/api/login', {
      email: email,
      password: password
    });
  }
  getUsers(page: string): Observable<any> {
    const myparams = new HttpParams().set('page', page);
    return this.http.get<CustomerModel[]>('https://reqres.in/api/users', {params: myparams});

  }
  getCustomer(customer: CustomerModel): Observable<any> {
    return this.http.get<any>('https://reqres.in/api/users/2');
  }
  insertCustomer(customer: CustomerModel): Observable<any> {
    return this.http.post<any>('https://reqres.in/api/users', customer);
  }
  updateCustomer(customer: CustomerModel): Observable<any> {
    return this.http.put<any>('https://reqres.in/api/users/2', customer);
  }
  deleteCustomer(customer: CustomerModel): Observable<any> {
    return this.http.delete<any>('https://reqres.in/api/users/2');
  }
}

