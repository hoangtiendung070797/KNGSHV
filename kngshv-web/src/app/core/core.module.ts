import { NgModule } from "@angular/core";
import { JwtModule } from "@auth0/angular-jwt";
import { AntDesignModule } from "../shared/ant-design.module";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthGuardService } from "./guards/auth-guard.service";
import { AuthenticationService } from "./guards/authentication.service";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    AntDesignModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  exports: [
    AntDesignModule
  ]
})
export class CoreModule { }
