import { Routes } from "@angular/router";

export const profileRoutes: Routes = [
  {
    path: ':username',
    title: 'Profile',
    loadComponent: () => import('./pages/profile-view/profile-view').then(m => m.ProfileView)
  },
  {
    path: 'me/edit',
    title: 'Edit Profile',
    loadComponent: () => import('./pages/edit-profile/edit-profile').then(m => m.EditProfile)
  }]
