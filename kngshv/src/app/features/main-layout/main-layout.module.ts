import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { MainLayoutRoutingModule } from './main-layout.routing';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { FunctionsComponent } from './pages/functions/functions.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { MaterialDesginModule } from 'src/app/shared/material-desgin.module';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MultilevelMenuService } from "ng-material-multilevel-menu/lib/multilevel-menu.service";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
@NgModule({
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MaterialDesginModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
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
  providers: [

  ]
})
export class MainLayoutModule { }
