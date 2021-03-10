import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { RoleGuardService } from './core/guards/role-guard.service';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main-layout',
    canActivate: [RoleGuardService, AuthGuardService],
    loadChildren: () => import('./features/main-layout/main-layout.module').then(m => m.MainLayoutModule),
    data: {
      role: 'Main-Layout.Access',
    },
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
