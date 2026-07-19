import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Animais } from './animais/animais';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'animais',
    component: Animais,
    canActivate: [authGuard]
  }

];