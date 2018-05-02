import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
import { DateRangePickerDirective } from './date-range-picker.directive';


@NgModule({
  declarations: [
    AppComponent,
    DaterangepickerComponent,
    DateRangePickerDirective
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [DaterangepickerComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
