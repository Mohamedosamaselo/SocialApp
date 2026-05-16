import { Routes } from "@angular/router";

export const settingsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'account',
    title: 'Account Settings',
    loadComponent: () => import('./pages/account-setting/account-setting').then(m => m.AccountSetting)
  }
]
