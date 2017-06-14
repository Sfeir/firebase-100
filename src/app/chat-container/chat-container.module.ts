import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ROUTES } from './chat-container.routes';

// FIREBASE MODULES
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES,{useHash: true}),

    // imports firebase/app needed for everything
    AngularFireModule.initializeApp(environment.firebase, 'sfeir-firebase'), 
    // imports firebase/database, only needed for database features
    AngularFireDatabaseModule, 
    // imports firebase/auth, only needed for auth features
    AngularFireAuthModule, 
  ],
  declarations: [ChatComponent]
})
export class ChatContainerModule { }
