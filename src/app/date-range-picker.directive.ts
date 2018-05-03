import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output, HostListener, Renderer2, ViewChild } from "@angular/core";
import { ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef } from '@angular/core';

import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
@Directive({
  selector: '[date-range-picker]'
})
export class DateRangePickerDirective {
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() singleDatePicker?: boolean;
  @Input() linkedCalendars?: boolean
  @Input() startDate?: string;
  @Input() ngModel?: string;
  @Input() endDate?: string;
  @Output() dateselected = new EventEmitter();
  @Output() ngModelChanged = new EventEmitter();
  componentRef = null;
  pickerLoaded = false;

  constructor(private ngZone: NgZone, private renderer: Renderer2, private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  @HostListener('focus', ['$event'])
  onFocus(event: Event) {
    console.log('focused');
    this.renderer.setStyle(this.viewContainer.element.nativeElement.parentElement, 'position', 'relative');
    let height = this.viewContainer.element.nativeElement.offsetHeight;
    this.viewContainer.clear();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(DaterangepickerComponent);
    this.componentRef = this.viewContainer.createComponent(componentFactory);
    this.componentRef.instance.minDate = this.minDate;
    this.componentRef.instance.maxDate = this.maxDate;
    this.componentRef.instance.singleDatePicker = this.singleDatePicker;
    this.componentRef.instance.startDate = this.startDate;
    this.componentRef.instance.endDate = this.endDate;

    document.getElementsByClassName('rl-drpicker')[0].setAttribute('style', 'top:' + parseInt(height + 10) + 'px');
    this.componentRef.instance.close.subscribe(() => {
      this.componentRef.destroy();
    });
    this.componentRef.instance.dateSelected.subscribe((val) => {
      this.dateselected.emit(val);
      this.componentRef.destroy();
      this.pickerLoaded = false;
    });

  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (this.componentRef) {
      const clickedDp = this.componentRef.location.nativeElement.contains(targetElement);
      const clickedInput = this.viewContainer.element.nativeElement == targetElement;
      const inDp = (targetElement.parentElement ? targetElement.parentElement.classList.contains('calendar-row') : false);
      if (!clickedDp && !clickedInput && !inDp) {
        if (this.componentRef) {
          this.componentRef.destroy();
        }
      }
    }

  }
}
