import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'create-request',
        pathMatch: 'full',
      },
      {
        path: 'auth',
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
      {
        path: 'app',
        loadComponent: () =>
          import('./shared/pages/app-page/app-page.component').then(
            (m) => m.AppPageComponent
          ),
        children: [
          {
            path: 'create-request',
            loadComponent: () =>
              import('./context/service-management/pages/create-request/create-request.component').then(
                (m) => m.CreateRequestPageComponent
              ),
          },
        ],
      },

];
