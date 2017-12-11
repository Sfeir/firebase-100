import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// App
import { environment } from '../../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardService } from './login/login-guard.service';
import { ROUTES } from './chat-container.routes';
import { MatModule } from './../shared/material.module';

import { StorageService } from './_shared/storage.service';
import { DatabaseService } from './_shared/database.service';
import { AuthService } from './_shared/auth.service';

import * as firebase from 'firebase';
firebase.initializeApp(environment.firebase);

@NgModule({
  imports: [
    CommonModule,
    MatModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatItemComponent,
    ChatInputComponent,
    LoginComponent
  ],
  providers: [
    LoginGuardService,
    StorageService,
    DatabaseService,
    AuthService
  ]
})
export class ChatContainerModule {}
