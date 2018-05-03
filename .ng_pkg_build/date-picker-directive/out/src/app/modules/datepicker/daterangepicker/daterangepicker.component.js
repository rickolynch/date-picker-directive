/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
export class DaterangepickerComponent {
    constructor() {
        this.locale = {
            direction: 'ltr',
            format: moment.localeData().longDateFormat('L'),
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };
        this._mindate = null;
        this._maxdate = null;
        this._singleDatePicker = false;
        this.linkedCalendars = true;
        this.tmpDate = null;
        this.tmpEndDate = null;
        this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.focusedInput = 'start';
        this.close = new EventEmitter();
        this.dateSelected = new EventEmitter();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set minDate(date) {
        if (date) {
            this._mindate = moment(date, this.locale.format);
        }
    }
    /**
     * @return {?}
     */
    get minDate() {
        return this._mindate;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set maxDate(date) {
        if (date) {
            this._maxdate = moment(date, this.locale.format);
        }
    }
    /**
     * @return {?}
     */
    get maxDate() {
        return this._maxdate;
    }
    /**
     * @param {?} isSingle
     * @return {?}
     */
    set singleDatePicker(isSingle) {
        if (isSingle) {
            this._singleDatePicker = isSingle;
        }
    }
    /**
     * @return {?}
     */
    get singleDatePicker() {
        return this._singleDatePicker;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set startDate(date) {
        if (date) {
            this._startDate = moment(date, this.locale.format).startOf('day');
        }
    }
    /**
     * @return {?}
     */
    get startDate() {
        return this._startDate;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set endDate(date) {
        if (date) {
            this._endDate = moment(date, this.locale.format).endOf('day');
        }
    }
    /**
     * @return {?}
     */
    get endDate() {
        return this._endDate;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ranges = [{
                title: 'Today',
                period: [moment(), moment()]
            }, {
                title: 'Yesterday',
                period: [moment().subtract(1, 'day'), moment().subtract(1, 'day')]
            }, {
                title: 'Last 7 Days',
                period: [moment().subtract(6, 'day'), moment()]
            }, {
                title: 'Last 30 Days',
                period: [moment().subtract(29, 'day'), moment()]
            }, {
                title: 'This Month',
                period: [moment().startOf('month'), moment()]
            }, {
                title: 'Last Month',
                period: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }];
        if (!this.startDate) {
            this._startDate = moment().startOf('day');
        }
        this.leftCalendar = { month: this.startDate.clone().date(2), calendar: null };
        if (!this.endDate) {
            this._endDate = this.startDate.clone().endOf('day');
        }
        this.rightCalendar = { month: this.endDate.clone().date(2).add(1, 'month'), calendar: null };
        this.displayStartDate = this.startDate.format(this.locale.format);
        this.displayEndDate = this.endDate.format(this.locale.format);
        this.renderCalendar('left');
        this.renderCalendar('right');
    }
    /**
     * @param {?} side
     * @return {?}
     */
    renderCalendar(side) {
        let /** @type {?} */ date = (side == 'left' ? this.leftCalendar.month : this.rightCalendar.month);
        let /** @type {?} */ month = date.month();
        let /** @type {?} */ year = date.year();
        let /** @type {?} */ hour = date.hour();
        let /** @type {?} */ minute = date.minute();
        let /** @type {?} */ second = date.second();
        let /** @type {?} */ daysInMonth = moment([year, month]).daysInMonth();
        let /** @type {?} */ firstDay = moment([year, month, 1]);
        let /** @type {?} */ lastDay = moment([year, month, daysInMonth]);
        let /** @type {?} */ lastMonth = moment(firstDay).subtract(1, 'month').month();
        let /** @type {?} */ lastYear = moment(firstDay).subtract(1, 'month').year();
        let /** @type {?} */ daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
        let /** @type {?} */ dayOfWeek = firstDay.day();
        let /** @type {?} */ calendar = [];
        for (let /** @type {?} */ i = 0; i < 6; i++) {
            calendar[i] = [];
        }
        let /** @type {?} */ startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
        if (startDay > daysInLastMonth) {
            startDay -= 7;
        }
        if (dayOfWeek === this.locale.firstDay) {
            startDay = daysInLastMonth - 6;
        }
        let /** @type {?} */ curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);
        let /** @type {?} */ col, /** @type {?} */ row;
        for (let /** @type {?} */ i = 0, /** @type {?} */ col = 0, /** @type {?} */ row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
            if (i > 0 && col % 7 === 0) {
                col = 0;
                row++;
            }
            calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
            curDate.hour(12);
            if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                calendar[row][col] = this.minDate.clone();
            }
            if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                calendar[row][col] = this.maxDate.clone();
            }
        }
        //make the calendar object available to hoverDate/clickDate
        if (side == 'left') {
            this.leftCalendar.calendar = calendar;
        }
        else {
            this.rightCalendar.calendar = calendar;
        }
    }
    /**
     * @param {?} day
     * @return {?}
     */
    isToday(day) {
        if (!day) {
            return false;
        }
        return moment().format('L') === day.format('L');
    }
    /**
     * @param {?} day
     * @return {?}
     */
    isActiveDate(day) {
        if (day.format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
            return true;
        }
        else if (this.endDate && day.format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} day
     * @return {?}
     */
    isStartDate(day) {
        if (day.format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} day
     * @return {?}
     */
    isEndDate(day) {
        if (this.endDate && day.format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} day
     * @return {?}
     */
    isDisabled(day) {
        if (this.minDate && day.isBefore(this.minDate, 'day')) {
            return true;
        }
        else if (this.maxDate && day.isAfter(this.maxDate, 'day')) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} day
     * @return {?}
     */
    isInRange(day) {
        if (this.endDate) {
            if (day.isAfter(this.startDate) && day.isBefore(this.endDate)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (day.isAfter(this.startDate) && day.isBefore(this.tmpDate)) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    /**
     * @return {?}
     */
    nextAvailable() {
        let /** @type {?} */ calendar = (this.singleDatePicker ? this.leftCalendar : this.rightCalendar);
        if (!this.maxDate || this.maxDate.isAfter(calendar.month.endOf('month'))) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    prevAvailable() {
        let /** @type {?} */ calendar = this.leftCalendar;
        if (!this.minDate || this.minDate.isBefore(calendar.month.startOf('month'))) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} day
     * @param {?} side
     * @return {?}
     */
    notActiveMonth(day, side) {
        let /** @type {?} */ cal = (side == 'left' ? this.leftCalendar.calendar : this.rightCalendar.calendar);
        if (day.month() != cal[1][1].month()) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} side
     * @return {?}
     */
    getMonth(side) {
        let /** @type {?} */ cal = (side == 'left' ? this.leftCalendar.calendar : this.rightCalendar.calendar);
        return this.locale.monthNames[cal[1][1].month()] + cal[1][1].format(" YYYY");
    }
    /**
     * @return {?}
     */
    clickPrev() {
        this.leftCalendar.month.subtract(1, 'month');
        this.renderCalendar('left');
        if (this.rightCalendar.calendar) {
            this.rightCalendar.month.subtract(1, 'month');
            this.renderCalendar('right');
        }
    }
    /**
     * @return {?}
     */
    clickNext() {
        this.leftCalendar.month.add(1, 'month');
        this.renderCalendar('left');
        if (this.rightCalendar.calendar) {
            this.rightCalendar.month.add(1, 'month');
            this.renderCalendar('right');
        }
    }
    /**
     * @param {?} day
     * @param {?} side
     * @return {?}
     */
    clickdate(day, side) {
        if (this.isDisabled(day)) {
            return false;
        }
        if (this.endDate || day.isBefore(this.startDate, 'day')) {
            this._endDate = null;
            this.setStartDate(day.clone());
            if (this.tmpEndDate) {
                this.setEndDate(this.tmpEndDate.clone());
            }
            else {
                this.focusedInput = 'end';
            }
        }
        else if (!this.endDate && day.isBefore(this.startDate)) {
            this.setEndDate(this.startDate.clone());
            this.focusedInput = 'start';
        }
        else {
            this.setEndDate(day.clone());
            this.focusedInput = 'start';
        }
        if (this.singleDatePicker) {
            this.setEndDate(this.startDate);
            this.focusedInput = 'start';
            this.dateSelected.emit(this.startDate.format(this.locale.format));
        }
        this.updateView();
    }
    /**
     * @param {?} range
     * @return {?}
     */
    rangeClick(range) {
        this.setStartDate(range.period[0].clone());
        this.setEndDate(range.period[1].clone());
        this.updateView();
        this.applyClick();
    }
    /**
     * @param {?} range
     * @return {?}
     */
    rangeHover(range) {
        this.displayStartDate = range.period[0].format(this.locale.format);
        this.displayEndDate = range.period[1].format(this.locale.format);
    }
    /**
     * @return {?}
     */
    hoverExit() {
        this.displayStartDate = this.startDate.format(this.locale.format);
        this.displayEndDate = (this.endDate ? this.endDate.format(this.locale.format) : this.displayStartDate);
    }
    /**
     * @param {?} day
     * @return {?}
     */
    hoverdate(day) {
        if (this.isDisabled(day)) {
            return false;
        }
        this.tmpDate = day.clone();
        if (this.focusedInput === 'start') {
            this.displayStartDate = this.tmpDate.format(this.locale.format);
        }
        else {
            this.displayEndDate = this.tmpDate.format(this.locale.format);
        }
    }
    /**
     * @param {?} side
     * @return {?}
     */
    inputFocus(side) {
        this.focusedInput = side;
        if (this.endDate) {
            this.tmpEndDate = this.endDate.clone();
            if (side == 'start') {
            }
            else if (side == 'end') {
                this._endDate = null;
            }
        }
    }
    /**
     * @param {?} side
     * @return {?}
     */
    inputBlur(side) {
        // console.log('blur');
        // if (side == 'end') {
        //   this.endDate = this.tmpEndDate.clone();
        //   this.tmpEndDate = null;
        // }
        // if (!this.endDate) {
        //   this.endDate = moment(this.displayEndDate, this.locale.format).clone();
        // }
    }
    /**
     * @param {?} event
     * @param {?} side
     * @return {?}
     */
    inputChanged(event, side) {
        let /** @type {?} */ val = moment(event.target.value, this.locale.format);
        if (this.isDisabled(val)) {
            return false;
        }
        if (side === 'start') {
            this.setStartDate(val.clone());
        }
        else if (side === 'end') {
            this.setEndDate(val.clone());
            if (val.isBefore(this.startDate, 'day')) {
                this.setStartDate(val.clone());
            }
        }
        this.updateView();
    }
    /**
     * @return {?}
     */
    updateView() {
        if (this.endDate) {
            //if both dates are visible already, do nothing
            if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                &&
                    (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))) {
                return;
            }
            this.leftCalendar.month = this.startDate.clone().date(2);
            if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                this.rightCalendar.month = this.endDate.clone().date(2);
            }
            else {
                this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
            }
        }
        else {
            if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                this.leftCalendar.month = this.startDate.clone().date(2);
                this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
            }
        }
        if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
            this.rightCalendar.month = this.maxDate.clone().date(2);
            this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
        }
        this.renderCalendar('left');
        this.renderCalendar('right');
    }
    /**
     * @param {?} startDate
     * @return {?}
     */
    setStartDate(startDate) {
        if (typeof startDate === 'string')
            this._startDate = moment(startDate, this.locale.format);
        if (typeof startDate === 'object')
            this._startDate = moment(startDate);
        this.displayStartDate = this.startDate.format(this.locale.format);
        // if (this.minDate && this.startDate.isBefore(this.minDate)) {
        //     this.startDate = this.minDate.clone();
        //     if (this.timePicker && this.timePickerIncrement)
        //         this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
        // }
        // if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
        //     this.startDate = this.maxDate.clone();
        //     if (this.timePicker && this.timePickerIncrement)
        //         this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
        // }
        // if (!this.isShowing)
        //     this.updateElement();
        // this.updateMonthsInView();
    }
    /**
     * @param {?} endDate
     * @return {?}
     */
    setEndDate(endDate) {
        if (typeof endDate === 'string')
            this._endDate = moment(endDate, this.locale.format);
        if (typeof endDate === 'object')
            this._endDate = moment(endDate);
        this.displayEndDate = this.endDate.format(this.locale.format);
        this.tmpEndDate = null;
        // if (this.endDate.isBefore(this.startDate))
        //     this.endDate = this.startDate.clone();
        // if (this.maxDate && this.endDate.isAfter(this.maxDate))
        //     this.endDate = this.maxDate.clone();
        // if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
        //     this.endDate = this.startDate.clone().add(this.dateLimit);
        // this.previousRightTime = this.endDate.clone();
        // if (!this.isShowing)
        //     this.updateElement();
        // this.updateMonthsInView();
    }
    /**
     * @return {?}
     */
    applyClick() {
        this.dateSelected.emit(this.startDate.format(this.locale.format) + ' - ' + this.endDate.format(this.locale.format));
    }
    /**
     * @return {?}
     */
    cancelClick() {
        this.close.emit(false);
    }
}
DaterangepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-daterangepicker',
                template: `<div class="rl-drpicker">
  <div id="range-container" class="column" *ngIf="!singleDatePicker">
    <div *ngFor="let range of ranges" class="range" (mouseenter)="rangeHover(range)" (mouseleave)="hoverExit()" (click)="rangeClick(range)">{{range.title}}</div>
    <div class="buttons">
      <button class="apply" (click)="applyClick()">Apply</button>
      <button class="cancel" (click)="cancelClick()">Cancel</button>
    </div>
  </div>
  <div id="calendar-container" class="column left">
    <div class="calendar-input">
      <input type="text" placeholder="Start Date" [value]="displayStartDate" [class.focused]="focusedInput=='start'" (change)="inputChanged($event, 'start')"
        (focus)="inputFocus('start')" (blur)="inputBlur('start')" />
    </div>
    <div class="calendar-table">
      <div class="calendar-period">
        <div class="nav-button prev" (click)="clickPrev()" *ngIf="prevAvailable()">
          <i class="calendar-nav"></i>
        </div>
        {{getMonth('left')}}
        <div class="nav-button next" (click)="clickNext()" *ngIf="nextAvailable() && singleDatePicker">
          <i class="calendar-nav"></i>
        </div>
      </div>
      <div class="days-header">
        <div class="day" *ngFor="let day of days">{{day}}</div>
      </div>
      <div class="calendar-row" *ngFor="let row of leftCalendar.calendar">
        <div *ngFor="let col of row" [class.today]="isToday(col)" [class.off]="notActiveMonth(col, 'left')" [class.active]="isActiveDate(col)"
          [class.in-range]="isInRange(col)" [class.disabled]="isDisabled(col)" [ngClass]="{'start-date':isStartDate(col), 'end-date':isEndDate(col)}"
          (mouseenter)="hoverdate(col)" (mouseleave)="hoverExit()" (click)="clickdate(col, 'left')">{{col.date()}}</div>
      </div>
    </div>
  </div>
  <div id="calendar-container" class="column right" *ngIf="!singleDatePicker">
    <div class="calendar-input">
      <input type="text" placeholder="End Date" [value]="displayEndDate" [class.focused]="focusedInput=='end'" (change)="inputChanged($event, 'end')"
        (focus)="inputFocus('end')" (blur)="inputBlur('start')" />
    </div>
    <div class="calendar-table">
      <div class="calendar-period">
        <div class="nav-button next" (click)="clickNext()" *ngIf="nextAvailable()">
          <i class="calendar-nav"></i>
        </div>
        {{getMonth('right')}}</div>
      <div class="days-header">
        <div class="day" *ngFor="let day of days">{{day}}</div>
      </div>
      <div class="calendar-row" *ngFor="let row of rightCalendar.calendar">
        <div *ngFor="let col of row" [class.today]="isToday(col)" [class.off]="notActiveMonth(col, 'right')" [class.active]="isActiveDate(col)"
          (mouseleave)="hoverExit()" [class.in-range]="isInRange(col)" [class.disabled]="isDisabled(col)" [ngClass]="{'start-date':isStartDate(col), 'end-date':isEndDate(col)}"
          (mouseenter)="hoverdate(col)" (click)="clickdate(col, 'right')">{{col.date()}}</div>
      </div>
    </div>
  </div>
</div>
`,
                styles: [`.rl-drpicker{position:absolute;top:5px;left:0;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;display:inline-block;border:1px solid #eee;background-color:#fff;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175);width:auto;padding:10px;color:#333}.rl-drpicker>.column{display:inline-block;vertical-align:top}.rl-drpicker>#range-container{width:140px}.rl-drpicker>#range-container>.range{font-size:11pt;background-color:#f5f5f5;border:1px solid #f5f5f5;color:#08c;padding:5px 12px;margin-bottom:10px;cursor:pointer}.rl-drpicker>#range-container>.range:hover{background-color:#08c;border:1px solid #08c;color:#fff}.rl-drpicker>#calendar-container{margin-right:10px}.rl-drpicker>#calendar-container .calendar-input{padding:0 15px;margin-bottom:10px}.rl-drpicker>#calendar-container .calendar-input>input{width:100%;font-size:10pt;padding:5px 0 5px 5px;border:1px solid #ccc}.rl-drpicker>#calendar-container .calendar-input input.focused{border:1px solid #08c}.rl-drpicker>#calendar-container .calendar-period{text-align:center;font-weight:800;font-size:10pt;margin:7px 10px 3px 15px;line-height:24px;height:24px}.rl-drpicker>#calendar-container .calendar-period .nav-button{height:100%;width:32px;vertical-align:top;text-align:center;cursor:pointer}.rl-drpicker>#calendar-container .calendar-period .nav-button>.calendar-nav{border:solid #333;border-width:0 3px 3px 0;padding:5px;display:inline-block}.rl-drpicker>#calendar-container .calendar-period .nav-button.prev{float:left}.rl-drpicker>#calendar-container .calendar-period .nav-button.prev>.calendar-nav{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.rl-drpicker>#calendar-container .calendar-period .nav-button.next{float:right}.rl-drpicker>#calendar-container .calendar-period .nav-button.next>.calendar-nav{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.rl-drpicker>#calendar-container .calendar-period .nav-button:hover .calendar-nav{border:solid #08c;border-width:0 3px 3px 0}.rl-drpicker>#calendar-container .days-header>div{display:inline-block;font-weight:800;font-size:10pt;white-space:nowrap;text-align:center;width:32px;height:32px;line-height:32px}.rl-drpicker>#calendar-container .calendar-row>div{cursor:pointer;display:inline-block;font-weight:500;font-size:10pt;white-space:nowrap;text-align:center;width:32px;height:32px;line-height:32px}.rl-drpicker>#calendar-container .calendar-row>div:hover{background-color:#eee;color:#333}.rl-drpicker>#calendar-container .calendar-row>div.active:not(.off){background-color:#08c!important;color:#fff!important}.rl-drpicker>#calendar-container .calendar-row>div.in-range:not(.off){background-color:#ebf4f8;color:#333}.rl-drpicker>#calendar-container .calendar-row .today:not(.off){background:#b71c1c;color:#fff}.rl-drpicker>#calendar-container .calendar-row .off{color:#999}.rl-drpicker>#calendar-container .calendar-row .disabled{color:#999;text-decoration:line-through}.rl-drpicker>#calendar-container:last-of-type{margin-right:0}.rl-drpicker .buttons>button{padding:5px 10px;font-size:11pt;cursor:pointer}.rl-drpicker .buttons button.apply{background:#08c;color:#fff;border:1px solid #08c}.rl-drpicker .buttons button.apply:hover{background:#1565c0}.rl-drpicker .buttons button.cancel{background:#eee;border:1px solid #ddd}.rl-drpicker .buttons button.cancel:hover{background:#ccc}.rl-drpicker:before{position:absolute;display:inline-block;top:-9px;border-right:7px solid transparent;border-left:7px solid transparent;border-bottom:9px solid #eee;content:''}`]
            },] },
];
/** @nocollapse */
DaterangepickerComponent.ctorParameters = () => [];
DaterangepickerComponent.propDecorators = {
    "minDate": [{ type: Input },],
    "maxDate": [{ type: Input },],
    "singleDatePicker": [{ type: Input },],
    "startDate": [{ type: Input },],
    "endDate": [{ type: Input },],
};
function DaterangepickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DaterangepickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DaterangepickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DaterangepickerComponent.propDecorators;
    /** @type {?} */
    DaterangepickerComponent.prototype.locale;
    /** @type {?} */
    DaterangepickerComponent.prototype._mindate;
    /** @type {?} */
    DaterangepickerComponent.prototype._maxdate;
    /** @type {?} */
    DaterangepickerComponent.prototype._singleDatePicker;
    /** @type {?} */
    DaterangepickerComponent.prototype.linkedCalendars;
    /** @type {?} */
    DaterangepickerComponent.prototype._startDate;
    /** @type {?} */
    DaterangepickerComponent.prototype._endDate;
    /** @type {?} */
    DaterangepickerComponent.prototype.tmpDate;
    /** @type {?} */
    DaterangepickerComponent.prototype.tmpEndDate;
    /** @type {?} */
    DaterangepickerComponent.prototype.leftCalendar;
    /** @type {?} */
    DaterangepickerComponent.prototype.rightCalendar;
    /** @type {?} */
    DaterangepickerComponent.prototype.ranges;
    /** @type {?} */
    DaterangepickerComponent.prototype.days;
    /** @type {?} */
    DaterangepickerComponent.prototype.displayStartDate;
    /** @type {?} */
    DaterangepickerComponent.prototype.displayEndDate;
    /** @type {?} */
    DaterangepickerComponent.prototype.focusedInput;
    /** @type {?} */
    DaterangepickerComponent.prototype.close;
    /** @type {?} */
    DaterangepickerComponent.prototype.dateSelected;
}
//# sourceMappingURL=daterangepicker.component.js.map