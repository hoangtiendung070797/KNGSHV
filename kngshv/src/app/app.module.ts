import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './features/login/login.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginService } from './features/login/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,

    CoreModule,
    SharedModule,
    RouterModule,
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
