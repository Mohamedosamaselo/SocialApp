import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayout,
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      {
        path: 'feed',
        title: 'Feed',
        loadChildren: () => import('./features/feed/feed.routes').then((m) => m.feedRoutes),
      },
      {
        path: 'profile',
        title: 'Profile',
        loadChildren: () =>
          import('./features/profile/profile.routes').then((m) => m.profileRoutes),
      },
      {
        path: 'messages',
        title: 'Messages',
        loadChildren: () =>
          import('./features/messages/messages.routes').then((m) => m.messagesRoutes),
      },
      {
        path: 'notifications',
        title: 'Notifications',
        loadChildren: () =>
          import('./features/notifications/notification.routes').then((m) => m.notificationsRoutes),
      },
      {
        path: 'search',
        title: 'Search',
        loadChildren: () => import('./features/search/search.routes').then((m) => m.searchRoutes),
      },
      {
        path: 'settings',
        title: 'Settings',
        loadChildren: () =>
          import('./features/settings/settings.routes').then((m) => m.settingsRoutes),
      },
      {
        path: 'not-found',
        title: 'Page Not Found',
        loadComponent: () => import('./features/notfound/notfound').then((m) => m.Notfound),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
