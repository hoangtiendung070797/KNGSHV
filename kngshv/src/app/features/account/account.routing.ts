import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { AccountComponent } from './pages/account/account.component';
import { FunctionComponent } from './pages/function/function.component';

const routes: Routes = [
  {
    path: 'account-ui', component: AccountComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'function-ui', component: FunctionComponent,
    canActivate: [AuthGuardService]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
