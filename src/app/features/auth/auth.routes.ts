import { Routes } from "@angular/router";

export const authRoutes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: 'forgetPassword',
    title: 'Forgot Password',
    loadComponent: () =>
      import('./pages/forget-password/forget-password').then((m) => m.ForgetPassword),
  },
]


