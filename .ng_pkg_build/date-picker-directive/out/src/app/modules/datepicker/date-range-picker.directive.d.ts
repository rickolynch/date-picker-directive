import { EventEmitter, NgZone, Renderer2 } from "@angular/core";
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
export declare class DateRangePickerDirective {
    private ngZone;
    private renderer;
    private viewContainer;
    private componentFactoryResolver;
    minDate?: string;
    maxDate?: string;
    singleDatePicker?: boolean;
    linkedCalendars?: boolean;
    startDate?: string;
    ngModel?: string;
    endDate?: string;
    dateselected: EventEmitter<{}>;
    ngModelChanged: EventEmitter<{}>;
    componentRef: any;
    pickerLoaded: boolean;
    constructor(ngZone: NgZone, renderer: Renderer2, viewContainer: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver);
    onFocus(event: Event): void;
    onClick(targetElement: any): void;
}
