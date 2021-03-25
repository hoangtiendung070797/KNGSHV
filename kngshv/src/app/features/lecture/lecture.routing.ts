import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { LectureComponent } from './pages/lecture/lecture.component';

const routes: Routes = [
  {
    path: 'lecture-ui', component:LectureComponent,
    canActivate:[AuthGuardService]
   },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LectureRoutingModule { }

