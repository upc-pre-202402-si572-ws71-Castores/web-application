import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      {
        path: '',
        loadComponent: () =>
          import('./shared/pages/auth-page/auth-page.component').then(
            (m) => m.AuthPageComponent,
          ),
          children: [
            {
                path: 'sign-in',
                loadComponent: () =>
                  import('./context/identity-access-management/pages/login/login.component').then(
                    (m) => m.LoginPageComponent,
                  ),
            },
        ],
      },

];
