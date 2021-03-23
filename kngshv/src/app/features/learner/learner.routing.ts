import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { LearnerComponent } from './pages/learner/learner.component';


const routes: Routes = [
  {
    path: 'learner-ui', component: LearnerComponent,
    canActivate: [AuthGuardService]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnerRoutingModule { }
