/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Input, NgZone, Output, HostListener, Renderer2 } from "@angular/core";
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
export class DateRangePickerDirective {
    /**
     * @param {?} ngZone
     * @param {?} renderer
     * @param {?} viewContainer
     * @param {?} componentFactoryResolver
     */
    constructor(ngZone, renderer, viewContainer, componentFactoryResolver) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.dateselected = new EventEmitter();
        this.ngModelChanged = new EventEmitter();
        this.componentRef = null;
        this.pickerLoaded = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFocus(event) {
        console.log('focused');
        this.renderer.setStyle(this.viewContainer.element.nativeElement.parentElement, 'position', 'relative');
        let /** @type {?} */ height = this.viewContainer.element.nativeElement.offsetHeight;
        this.viewContainer.clear();
        let /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(DaterangepickerComponent);
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
    /**
     * @param {?} targetElement
     * @return {?}
     */
    onClick(targetElement) {
        if (this.componentRef) {
            const /** @type {?} */ clickedDp = this.componentRef.location.nativeElement.contains(targetElement);
            const /** @type {?} */ clickedInput = this.viewContainer.element.nativeElement == targetElement;
            const /** @type {?} */ inDp = (targetElement.parentElement ? targetElement.parentElement.classList.contains('calendar-row') : false);
            if (!clickedDp && !clickedInput && !inDp) {
                if (this.componentRef) {
                    this.componentRef.destroy();
                }
            }
        }
    }
}
DateRangePickerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[date-picker]'
            },] },
];
/** @nocollapse */
DateRangePickerDirective.ctorParameters = () => [
    { type: NgZone, },
    { type: Renderer2, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
];
DateRangePickerDirective.propDecorators = {
    "minDate": [{ type: Input },],
    "maxDate": [{ type: Input },],
    "singleDatePicker": [{ type: Input },],
    "linkedCalendars": [{ type: Input },],
    "startDate": [{ type: Input },],
    "ngModel": [{ type: Input },],
    "endDate": [{ type: Input },],
    "dateselected": [{ type: Output },],
    "ngModelChanged": [{ type: Output },],
    "onFocus": [{ type: HostListener, args: ['focus', ['$event'],] },],
    "onClick": [{ type: HostListener, args: ['document:click', ['$event.target'],] },],
};
function DateRangePickerDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DateRangePickerDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DateRangePickerDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DateRangePickerDirective.propDecorators;
    /** @type {?} */
    DateRangePickerDirective.prototype.minDate;
    /** @type {?} */
    DateRangePickerDirective.prototype.maxDate;
    /** @type {?} */
    DateRangePickerDirective.prototype.singleDatePicker;
    /** @type {?} */
    DateRangePickerDirective.prototype.linkedCalendars;
    /** @type {?} */
    DateRangePickerDirective.prototype.startDate;
    /** @type {?} */
    DateRangePickerDirective.prototype.ngModel;
    /** @type {?} */
    DateRangePickerDirective.prototype.endDate;
    /** @type {?} */
    DateRangePickerDirective.prototype.dateselected;
    /** @type {?} */
    DateRangePickerDirective.prototype.ngModelChanged;
    /** @type {?} */
    DateRangePickerDirective.prototype.componentRef;
    /** @type {?} */
    DateRangePickerDirective.prototype.pickerLoaded;
    /** @type {?} */
    DateRangePickerDirective.prototype.ngZone;
    /** @type {?} */
    DateRangePickerDirective.prototype.renderer;
    /** @type {?} */
    DateRangePickerDirective.prototype.viewContainer;
    /** @type {?} */
    DateRangePickerDirective.prototype.componentFactoryResolver;
}
//# sourceMappingURL=date-range-picker.directive.js.map