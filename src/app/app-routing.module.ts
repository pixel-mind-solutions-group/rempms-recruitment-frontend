import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';

import { DefaultLayoutComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'employer',
        loadChildren: () =>
          import('./views/employer/employer.module').then(
            (m) => m.EmployerModule
          ),
      },
      {
        path: 'job-position',
        loadChildren: () =>
          import('./views/job-position/job-position.module').then(
            (m) => m.JobPositionModule
          ),
      },
      {
        path: 'job-vacancy',
        loadChildren: () =>
          import('./views/job-vacancy/job-vacancy.module').then(
            (m) => m.JobVacancyModule
          ),
      },
      {
        path: 'received-cvs',
        loadChildren: () =>
          import('./views/recieved-cvs/recieved-cvs.module').then(
            (m) => m.RecievedCvsModule
          ),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
