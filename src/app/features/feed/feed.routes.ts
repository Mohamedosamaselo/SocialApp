import { Routes } from "@angular/router"


export const feedRoutes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  }
]
