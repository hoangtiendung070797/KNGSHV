import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './services/account.service';
import { AccountRoutingModule } from './account.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoleGuardService } from 'src/app/core/guards/role-guard.service';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { AccountComponent } from './pages/account/account.component';
import { FunctionComponent } from './pages/function/function.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CreateAccountComponent } from './components/account-dialogs/create-account/create-account.component';
import { UpdateAccountComponent } from './components/account-dialogs/update-account/UpdateAccountComponent';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,

  ],
  declarations: [
    LayoutComponent,
    AccountComponent,
    FunctionComponent,
    CreateAccountComponent,
    UpdateAccountComponent
  ],
  providers: [
    AccountService,
    RoleGuardService,
    AuthGuardService
  ]
})
export class AccountModule { }
