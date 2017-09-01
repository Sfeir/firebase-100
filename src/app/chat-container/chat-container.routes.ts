import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './login/login-guard.service';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';

export const ROUTES: Routes = [
  {path: 'chat', canActivate: [LoginGuardService], children: [
    {path: '', component: ChatComponent},
    {path: ':id', component: ChatComponent},
  ]},
  {path: 'login', component: LoginComponent}
];
