import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { DatepickerModule } from './modules/datepicker/datepicker.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DatepickerModule
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
