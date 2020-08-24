import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { SigninWithPhoneComponent } from './pages/signin-with-phone/signin-with-phone.component';
import { Role } from './models/role';
import { AuthGuard } from './_helpers/auth.guard';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'phone', component: SigninWithPhoneComponent },

  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  // {
  //   path: 'teacher',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./teacher/teacher.module').then((m) => m.TeacherModule),
  //   data: { roles: [Role.Teacher] },
  // },
  // {
  //   path: 'student',
  //   loadChildren: () =>
  //     import('./student/student.module').then((m) => m.StudentModule),
  // },

  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
