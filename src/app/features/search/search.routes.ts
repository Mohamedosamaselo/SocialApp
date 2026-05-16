import { Routes } from "@angular/router";

export const searchRoutes: Routes = [
  {
    path: '',
    title: 'Search',
    loadComponent: () => import('./pages/search-page/search-page').then(m => m.SearchPage)
  }
]
