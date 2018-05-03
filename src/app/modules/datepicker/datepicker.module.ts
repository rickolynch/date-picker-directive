import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as momentNs from 'moment';
const moment = momentNs;
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
import { DateRangePickerDirective } from './date-range-picker.directive';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DaterangepickerComponent, DateRangePickerDirective],
  entryComponents: [DaterangepickerComponent],
  exports: [
    DaterangepickerComponent,
    DateRangePickerDirective
  ]
})
export class DatepickerModule { }
