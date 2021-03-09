import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main-layout',
    loadChildren: () => import('./features/main-layout/main-layout.module').then(m => m.MainLayoutModule)
  },
  {
    path: 'concac',
    loadChildren:()=> import ('./features/concac/concac.module').then(m=>m.ConCacModule)
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
