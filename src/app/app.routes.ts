import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'modal-example',
    loadComponent: () => import('./modal-example/modal-example.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'modal-example',
    pathMatch: 'full',
  }
];
