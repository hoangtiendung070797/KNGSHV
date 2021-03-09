import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { MainLayoutRoutingModule } from './main-layout.routing';
import { AntDesignModule } from 'src/app/shared/ant-design.module';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { FunctionsComponent } from './pages/functions/functions.component';
import { PermissionComponent } from './pages/permission/permission.component';
@NgModule({
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    AntDesignModule,
  ],
  declarations: [
    // layout
    MainLayoutComponent,

    // pages
    AccountsComponent,
    FunctionsComponent,
    PermissionComponent

    // components (dialogs)

  ],
})
export class MainLayoutModule { }
