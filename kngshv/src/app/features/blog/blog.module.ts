import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogRoutingModule } from './blog.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { CreateBlogComponent } from './components/blog-dialog/create-blog/create-blog.component';
import { RoleGuardService } from 'src/app/core/guards/role-guard.service';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { BlogService } from './services/blog.service';
import { UpdateBlogComponent } from './components/blog-dialog/update-blog/update-blog.component';
import { ComfirmComponent } from 'src/app/shared/components/comfirm/comfirm.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,


  ],
  declarations: [
    BlogComponent,
    CreateBlogComponent,
    UpdateBlogComponent
  ],
  entryComponents:[
    CreateBlogComponent,
    UpdateBlogComponent,
    ComfirmComponent
  ],
  providers: [
    RoleGuardService,
    AuthGuardService,
    BlogService
  ]
})
export class BlogModule { }
