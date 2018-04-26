import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';


@NgModule({
  declarations: [
    AppComponent,
    DaterangepickerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
