import {Injectable} from '@angular/core';
import { tokenKey } from '@angular/core/src/view';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
