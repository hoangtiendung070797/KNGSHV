import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models/user-login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }


  public login(user: UserLogin) {
    return this.httpClient.post(`${environment.localDomain}/api/Accounts/Login`, user);
  }


}
