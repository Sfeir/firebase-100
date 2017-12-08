import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// FIREBASE MODULES
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// App
import { environment } from '../../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardService } from './login/login-guard.service';
import { StorageService } from './_shared/storage.service';
import { DatabaseService } from './_shared/database.service';
import { MessagingService } from './_shared/messaging.service';
import { ROUTES } from './chat-container.routes';

import { MatModule } from './../shared/material.module';
import { AuthService } from './_shared/auth.service';

@NgModule({
  imports: [
    CommonModule,
    MatModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),

    // imports firebase/app needed for everything
    AngularFireModule.initializeApp(environment.firebase, 'sfeir-firebase'),
    // imports firebase/database, only needed for database features
    AngularFireDatabaseModule,
    // imports firebase/auth, only needed for auth features
    AngularFireAuthModule
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
    MessagingService,
    DatabaseService,
    AuthService
  ]
})
export class ChatContainerModule {}
