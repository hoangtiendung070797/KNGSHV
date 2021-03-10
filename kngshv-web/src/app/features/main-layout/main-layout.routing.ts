import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { RoleGuardService } from 'src/app/core/guards/role-guard.service';
import { MainLayoutComponent } from './main-layout.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { FunctionsComponent } from './pages/functions/functions.component';
import { PermissionComponent } from './pages/permission/permission.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      {
        path: 'accounts',
        component: AccountsComponent,
        canActivate: [RoleGuardService, AuthGuardService],
        data: {
          role: 'Account.Access',
        },
      },
      { path: 'functions', component: FunctionsComponent },
      { path: 'permission', component: PermissionComponent }

    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
