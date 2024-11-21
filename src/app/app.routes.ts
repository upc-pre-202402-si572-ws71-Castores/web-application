import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { authGuard } from '../app/guards/auth.guard'; // Importa el AuthGuard
import { carrierGuard } from './guards/carrier.guard'; // Guard específico para transportista
import { clientGuard } from './guards/client.guard'; // Guard específico para cliente


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
      // page not found 404
      {
        path: '**',
        loadComponent: () =>
          import('./public/pages/page-not-found/page-not-found.component').then(
            (m) => m.PageNotFoundComponent,
          ),
      }
    ],
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./shared/pages/app-page/app-page.component').then(
        (m) => m.AppPageComponent,
      ),
    canActivate: [authGuard], // Protege la ruta con AuthGuard
    children: [
      // Rutas para Carrier
      {
        path: 'carrier',
        //canActivate: [carrierGuard], // Solo accesible para transportistas
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
        //canActivate: [clientGuard], // Solo accesible para clientes
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
    redirectTo: 'auth/sign-in',
  },

];
