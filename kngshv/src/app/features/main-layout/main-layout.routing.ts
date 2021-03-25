import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { RoleGuardService } from 'src/app/core/guards/role-guard.service';
import { MainLayoutComponent } from './main-layout.component';
import { FunctionsComponent } from './pages/functions/functions.component';
import { PermissionComponent } from './pages/permission/permission.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      {
        path: 'accounts',
        canActivate: [RoleGuardService, AuthGuardService],
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule),
        data: {
          role: 'Account.Access',
        },
      },
      { path: 'functions', component: FunctionsComponent },
      { path: 'permission', component: PermissionComponent },
      {
        path: 'learners',
        canActivate: [RoleGuardService, AuthGuardService],
        loadChildren: () => import('../learner/learner.module').then(m => m.LearnerModule),
        data: {
          role: 'Learner.Access',
        },
      },
      {
        path: 'lectures',
        canActivate: [RoleGuardService, AuthGuardService],
        loadChildren: () => import('../lecture/lecture.module').then(m => m.LectureModule),
        data: {
          role: 'Lecture.Access',
        },
      },

    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
