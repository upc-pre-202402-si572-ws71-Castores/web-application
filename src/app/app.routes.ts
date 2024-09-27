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
      },,
      {
        path: '',
        loadComponent: () =>
          import('./shared/pages/app-page/app-page.component').then(
            (m) => m.AppPageComponent
          ),
        children: [
          {
            path: 'home',
            //title: 'Home',
            loadComponent: () =>
              import('./context/alerts-system/pages/home/home.component').then(
                (m) => m.HomeComponent
              ),
          },
        ],
      },

];
