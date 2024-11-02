import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./shared/pages/auth-page/auth-page.component').then(
        (m) => m.AuthPageComponent
      ),
    providers: [HttpClientModule],  // Aquí se agrega HttpClientModule
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./context/identity-access-management/pages/login/login.component').then(
            (m) => m.LoginPageComponent
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./context/identity-access-management/pages/signup/signup.component').then(
            (m) => m.SignupPageComponent
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./context/identity-access-management/pages/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordPageComponent
          ),
      },
      // page not found 404
      {
        path: '**',
        loadComponent: () =>
          import('./public/pages/page-not-found/page-not-found.component').then(
            (m) => m.PageNotFoundComponent,
          ),
      },
      {
        path: 'new-password',
        loadComponent: () =>
          import('./context/identity-access-management/pages/new-password/new-password.component').then(
            (m) => m.NewPasswordComponent
          ),
      },
      {
        path: 'new-account',
        loadComponent: () =>
          import('./context/identity-access-management/pages/new-account/new-account.component').then(
            (m) => m.NewAccountComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/sign-in',
  },

];
