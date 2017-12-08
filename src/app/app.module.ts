// CORE DEPS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { APP_ROUTES } from './app.routes';

import { PeopleAppComponent } from './app.component';
import { HomeComponent } from './home';
import { PersonComponent } from './person';
import { PeopleComponent } from './people';
import {
  CardComponent,
  FormComponent,
  PeopleService,
  NaPipe,
  SfeirBadgeDirective
} from './shared';
import { UpdateComponent } from './update';

import { ChatContainerModule } from './chat-container/chat-container.module';
import { MatModule } from './shared/material.module';

@NgModule({
  imports: [
    BrowserModule,
    MatModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    APP_ROUTES,
    ChatContainerModule
  ],
  declarations: [
    PeopleAppComponent,
    HomeComponent,
    PersonComponent,
    PeopleComponent,
    CardComponent,
    FormComponent,
    UpdateComponent,
    NaPipe,
    SfeirBadgeDirective
  ],
  providers: [PeopleService],
  bootstrap: [PeopleAppComponent]
})
export class AppModule {}
