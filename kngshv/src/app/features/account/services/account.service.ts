import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountViewModel } from '../models/account-view-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  public getAccounts() {
    return this.httpClient.get(`${environment.localDomain}/api/Accounts`);
  }

  public deleteAccount(id: string) {
    return this.httpClient.delete(`${environment.localDomain}/api/Accounts/${id}`);
  }

  public updateAccount(account: AccountViewModel) {
    return this.httpClient.put(`${environment.localDomain}/api/Accounts/${account.id}`, account);
  }

  public createAccount(account: AccountViewModel) {
    return this.httpClient.post(`${environment.localDomain}/api/Accounts`, account);
  }
}
