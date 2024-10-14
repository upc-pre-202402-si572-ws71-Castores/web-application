import { Routes } from '@angular/router';

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
            (m) => m.AppPageComponent,
          ),
        children: [
          // Rutas para Carrier
          {
            path: 'carrier',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./context/service-management/pages/home-carrier/home-carrier.component').then(
                    (m) => m.HomeCarrierPageComponent,
                  ),
              },
              {
                path: 'profile',
                loadComponent: () =>
                  import('./context/identity-access-management/pages/profile-carrier/profile-carrier.component').then(
                    (m) => m.ProfileCarrierPageComponent,
                  ),
              },
              {
                path: 'history',
                loadComponent: () =>
                  import('./context/service-management/pages/history-carrier/history-carrier.component').then(
                    (m) => m.HistoryCarrierPageComponent,
                  ),
              },
              {
                path: 'see-offers',
                loadComponent: () =>
                  import('./context/service-management/pages/see-offers/see-offers.component').then(
                    (m) => m.SeeOffersPageComponent,
                  ),
              },
            ],
          },
          // Rutas para Cliente
          {
            path: 'client',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./context/service-management/pages/home-client/home-client.component').then(
                    (m) => m.HomeClientPageComponent,
                  ),
              },
              {
                path: 'profile',
                loadComponent: () =>
                  import('./context/identity-access-management/pages/profile-client/profile-client.component').then(
                    (m) => m.ProfileClientPageComponent,
                  ),
              },
              {
                path: 'history',
                loadComponent: () =>
                  import('./context/service-management/pages/history-client/history-client.component').then(
                    (m) => m.HistoryClientPageComponent,
                  ),
              },
              {
                path: 'create-request',
                loadComponent: () =>
                  import('./context/service-management/pages/create-request/create-request.component').then(
                    (m) => m.CreateRequestPageComponent,
                  ),
              },
            ],
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'sign-in',
      },

];
