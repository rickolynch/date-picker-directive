import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-daterangepicker',
  templateUrl: './daterangepicker.component.html',
  styleUrls: ['./daterangepicker.component.scss']
})
export class DaterangepickerComponent implements OnInit {
  locale = {
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
  minDate: any = moment('01/29/2018', this.locale.format);
  maxDate: any = moment('05/29/2018', this.locale.format);
  singleDatePicker = false;
  linkedCalendars = true;
  startDate = moment().startOf('day');
  endDate = moment().endOf('day');
  tmpDate: any = null;
  tmpEndDate: any = null;
  leftCalendar = { month: this.startDate.clone().date(2), calendar: null };
  rightCalendar = { month: this.endDate.clone().date(2).add(1, 'month'), calendar: null };
  ranges: any;// = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This Month', 'Last Month'];
  days: any = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  displayStartDate: string;
  displayEndDate: string;
  focusedInput: string = 'start';
  constructor() { }

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

    this.displayStartDate = this.startDate.format(this.locale.format);
    this.displayEndDate = this.endDate.format(this.locale.format);
    this.renderCalendar('left');
    this.renderCalendar('right');
  }

  renderCalendar(side: string) {
    let date = (side == 'left' ? this.leftCalendar.month : this.rightCalendar.month);
    let month = date.month();
    let year = date.year();
    let hour = date.hour();
    let minute = date.minute();
    let second = date.second();
    let daysInMonth = moment([year, month]).daysInMonth();
    let firstDay = moment([year, month, 1]);
    let lastDay = moment([year, month, daysInMonth]);
    let lastMonth = moment(firstDay).subtract(1, 'month').month();
    let lastYear = moment(firstDay).subtract(1, 'month').year();
    let daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
    let dayOfWeek = firstDay.day();
    let calendar = [];
    for (let i = 0; i < 6; i++) {
      calendar[i] = [];
    }

    let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
    if (startDay > daysInLastMonth) {
      startDay -= 7;
    }


    if (dayOfWeek === this.locale.firstDay) {
      startDay = daysInLastMonth - 6;
    }
    let curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);
    let col, row;
    for (let i = 0, col = 0, row = 0; i < 42; i++ , col++ , curDate = moment(curDate).add(24, 'hour')) {
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
    } else {
      this.rightCalendar.calendar = calendar;
    }
  }
  isToday(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L');
  }
  isActiveDate(day) {
    if (day.format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
      return true;
    } else if (this.endDate && day.format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
      return true;
    }
    return false;
  }
  isStartDate(day) {
    if (day.format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
      return true;
    }
    return false;
  }
  isEndDate(day) {
    if (this.endDate && day.format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
      return true;
    }
    return false;
  }
  isDisabled(day) {
    if (this.minDate && day.isBefore(this.minDate, 'day')) {
      return true;
    } else if (this.maxDate && day.isAfter(this.maxDate, 'day')) {
      return true;
    }
    return false;
  }
  isInRange(day) {
    if (this.endDate) {
      if (day.isAfter(this.startDate) && day.isBefore(this.endDate)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (day.isAfter(this.startDate) && day.isBefore(this.tmpDate)) {
        return true;
      } else {
        return false;
      }
    }
    //   if ((day.isAfter(this.startDate) && day.isBefore(this.endDate)) || dt.isSame(date, 'day')) {
    //     return true
    // } else {
    //     return false;
    // }
  }
  nextAvailable() {
    let calendar = (this.singleDatePicker ? this.leftCalendar : this.rightCalendar);
    if (!this.maxDate || this.maxDate.isAfter(calendar.month.endOf('month'))) {
      return true;
    } else {
      return false;
    }
  }
  prevAvailable() {
    let calendar = this.leftCalendar;
    if (!this.minDate || this.minDate.isBefore(calendar.month.startOf('month'))) {
      return true;
    } else {
      return false;
    }
  }
  notActiveMonth(day, side) {
    let cal = (side == 'left' ? this.leftCalendar.calendar : this.rightCalendar.calendar);
    if (day.month() != cal[1][1].month()) {
      return true;
    }
    return false;
  }
  getMonth(side) {
    let cal = (side == 'left' ? this.leftCalendar.calendar : this.rightCalendar.calendar);
    return this.locale.monthNames[cal[1][1].month()] + cal[1][1].format(" YYYY");
  }
  clickPrev() {
    this.leftCalendar.month.subtract(1, 'month');
    this.renderCalendar('left');
    if (this.rightCalendar.calendar) {
      this.rightCalendar.month.subtract(1, 'month');
      this.renderCalendar('right');
    }
  }
  clickNext() {
    this.leftCalendar.month.add(1, 'month');
    this.renderCalendar('left');
    if (this.rightCalendar.calendar) {
      this.rightCalendar.month.add(1, 'month');
      this.renderCalendar('right');
    }
  }
  clickdate(day, side) {
    if (this.isDisabled(day)) {
      return false;
    }
    if (this.endDate || day.isBefore(this.startDate, 'day')) {
      this.endDate = null;
      this.setStartDate(day.clone());
      if (this.tmpEndDate) {
        this.setEndDate(this.tmpEndDate.clone());
      } else {
        this.focusedInput = 'end';
      }
    } else if (!this.endDate && day.isBefore(this.startDate)) {
      this.setEndDate(this.startDate.clone());
      this.focusedInput = 'start';
    } else {
      this.setEndDate(day.clone());
      this.focusedInput = 'start';
    }
    if (this.singleDatePicker) {
      this.setEndDate(this.startDate);
      this.focusedInput = 'start';
    }
    this.updateView();
  }
  rangeClick(range) {
    this.setStartDate(range.period[0].clone());
    this.setEndDate(range.period[1].clone());
    this.updateView();
  }
  rangeHover(range) {
    this.displayStartDate = range.period[0].format(this.locale.format);
    this.displayEndDate = range.period[1].format(this.locale.format);
  }
  hoverExit() {
    this.displayStartDate = this.startDate.format(this.locale.format);
    this.displayEndDate = (this.endDate ? this.endDate.format(this.locale.format) : this.displayStartDate);
  }
  hoverdate(day) {
    if (this.isDisabled(day)) {
      return false;
    }
    this.tmpDate = day.clone();
    if (this.focusedInput === 'start') {
      this.displayStartDate = this.tmpDate.format(this.locale.format);
    } else {
      this.displayEndDate = this.tmpDate.format(this.locale.format);
    }
  }
  inputFocus(side) {
    this.focusedInput = side;
    if (this.endDate) {
      this.tmpEndDate = this.endDate.clone();
      if (side == 'start') {
      } else if (side == 'end') {
        this.endDate = null;
      }
    }

  }
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
  inputChanged(event, side) {
    let val = moment(event.target.value, this.locale.format);
    if (this.isDisabled(val)) {
      return false;
    }
    if (side === 'start') {
      this.setStartDate(val.clone());
    } else if (side === 'end') {
      this.setEndDate(val.clone());
      if (val.isBefore(this.startDate, 'day')) {
        this.setStartDate(val.clone());
      }
    }
    this.updateView();
  }
  updateView() {
    if (this.endDate) {

      //if both dates are visible already, do nothing
      if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
        (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
        &&
        (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
      ) {
        return;
      }

      this.leftCalendar.month = this.startDate.clone().date(2);
      if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
        this.rightCalendar.month = this.endDate.clone().date(2);
      } else {
        this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
      }

    } else {
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
  setStartDate(startDate) {
    if (typeof startDate === 'string')
      this.startDate = moment(startDate, this.locale.format);

    if (typeof startDate === 'object')
      this.startDate = moment(startDate);

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
  setEndDate(endDate) {
    if (typeof endDate === 'string')
      this.endDate = moment(endDate, this.locale.format);

    if (typeof endDate === 'object')
      this.endDate = moment(endDate);


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
  applyClick() {

  }
  cancelClick() {

  }
}
