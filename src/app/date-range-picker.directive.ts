import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output, HostListener } from "@angular/core";

@Directive({
  selector: '[date-range-picker]'
})
export class DateRangePickerDirective {
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() singleDatePicker?: boolean;
  @Input() linkedCalendars?: boolean
  @Input() startDate?: string;
  @Input() endDate?: string;
  constructor(private el: ElementRef, private ngZone: NgZone) { }

  @HostListener('focus', ['$event'])
  onFocus(event: Event) {
    console.log('focused');
  }
}
