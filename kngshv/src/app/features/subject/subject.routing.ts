import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { SubjectComponent } from './pages/subject/subject.component';

const routes: Routes = [
  {
    path:'subject-ui', component: SubjectComponent,
    canActivate:[AuthGuardService]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }

