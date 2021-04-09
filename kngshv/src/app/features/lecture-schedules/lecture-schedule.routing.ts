import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { LectureSchedulesComponent } from './pages/lecture-schedules/lecture-schedules.component';

const routes: Routes = [
  {
    path: 'schedule-ui', component: LectureSchedulesComponent,
    canActivate: [AuthGuardService]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LectureScheduleRoutingModule { }
