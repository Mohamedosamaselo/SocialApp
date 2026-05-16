import { Routes } from "@angular/router";



export const messagesRoutes: Routes = [
  { path: '', title: 'Messages', loadComponent: () => import('./pages/chat/chat').then(m => m.Chat) }
]
