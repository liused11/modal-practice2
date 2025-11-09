import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'portal/login',
    pathMatch: 'full',
  },
  {
		path: "portal/login",
		// canActivate: [LoginGuard],
		component: LoginPage,
	},
  {
    path: 'project',
    loadComponent: () => import('./pages/project/project.page').then( m => m.ProjectPage)
  },
  {
    path: 'chat-page',
    loadComponent: () => import('./pages/chat-page/chat-page.page').then( m => m.ChatComponent)
  },
  {
    path: 'slot',
    loadComponent: () => import('./pages/parking/slot/slot.page').then( m => m.SlotPage)
  },
  {
    path: 'parking',
    loadComponent: () => import('./pages/parking.modal/parking.modal.page').then( m => m.ParkingModalPage)
  },



  
  // {
  //   path: 'main',
  //   loadComponent: () => import('./main/main.page').then( m => m.MainPage)
  // },

];
