import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { BlogComponent } from './pages/blog/blog.component';

const routes: Routes = [
  {
    path: 'blog-ui',component: BlogComponent,
    canActivate:[AuthGuardService]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
