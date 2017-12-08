import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

const MAT_MODULES = [
  BrowserAnimationsModule,
  MatMenuModule,
  MatCheckboxModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule
];

@NgModule({
  imports: [...MAT_MODULES],
  exports: [...MAT_MODULES]
})
export class MatModule {}
