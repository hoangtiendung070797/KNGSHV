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

      {
        path: 'subject',
        canActivate: [RoleGuardService, AuthGuardService],
        loadChildren: () => import('../subject/subject.module').then(m => m.SubjectModule),
        data: {
          role: 'Subject.Access',
        },
      },
      {
        path: 'schedule',
        canActivate: [RoleGuardService, AuthGuardService],
        loadChildren: () => import('../lecture-schedules/lecture-schedules.module').then(m => m.LectureSchedulesModule),
        data: {
          role: 'LectureSchedule.Access',
        },
      },
      {
        path: 'blog',
        canActivate: [RoleGuardService, AuthGuardService],
        loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule),
        data: {
          role: 'Blog.Access',
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
