import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcacComponent } from './concac.component';

const routes: Routes = [

  {
    path: '', component: ConcacComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConCacRoutingModule { }
