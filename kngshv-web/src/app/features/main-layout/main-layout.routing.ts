import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { FunctionsComponent } from './pages/functions/functions.component';
import { PermissionComponent } from './pages/permission/permission.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: 'accounts', component: AccountsComponent },
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
