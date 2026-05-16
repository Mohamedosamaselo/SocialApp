import { Routes } from "@angular/router";

export const notificationsRoutes: Routes = [
  {
    path: '',
    title: 'Notifications',
    loadComponent: () => import('./pages/notifications-page/notifications-page').then(m => m.NotificationsPage)
  }
]
