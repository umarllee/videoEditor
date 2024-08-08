import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewVideoComponent } from './components/admin/new-video/new-video.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent},
  { path: 'videos',  component: NewVideoComponent},
  { path: 'admin',  component: AdminComponent, 
    children: [
      { path: '',  component: CategoriesComponent}, 
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
