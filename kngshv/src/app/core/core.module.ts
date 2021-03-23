import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { JwtModule } from "@auth0/angular-jwt";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthGuardService } from "./guards/auth-guard.service";
import { AuthenticationService } from "./guards/authentication.service";
import { UploadImageService } from "./services/upload-image.service";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      },
    }),
    CommonModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    UploadImageService
  ],
  exports: [
  ]
})
export class CoreModule { }
