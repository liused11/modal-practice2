import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },  {
    path: 'my-page',
    loadComponent: () => import('./my-page/my-page.page').then( m => m.MyPagePage)
  },
  {
    path: 'modal-example',
    loadComponent: () => import('./modal-example/modal-example.page').then( m => m.ModalExamplePage)
  },

];
