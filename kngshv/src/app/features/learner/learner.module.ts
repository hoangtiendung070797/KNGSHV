import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoleGuardService } from 'src/app/core/guards/role-guard.service';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { LearnerRoutingModule } from './learner.routing';
import { LearnerComponent } from './pages/learner/learner.component';
import { UpdateDialogComponent } from './components/learner-dialog/update-dialog/update-dialog.component';
import { CreateDialogComponent } from './components/learner-dialog/create-dialog/create-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LearnerRoutingModule,


  ],
  declarations: [
    LearnerComponent,
    UpdateDialogComponent,
    CreateDialogComponent

  ],
  providers: [
    RoleGuardService,
    AuthGuardService
  ]
})
export class LearnerModule { }
