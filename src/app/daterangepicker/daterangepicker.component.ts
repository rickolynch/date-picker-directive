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
  minDate: any = false;
  maxDate: any = false;

  startDate = moment().startOf('day');
  endDate = moment().endOf('day');
  leftCalendar = { month: this.startDate.clone().date(2), calendar: null };
  rightCalendar = { month: this.endDate.clone().date(2).add(1, 'month'), calendar: null };
  ranges: any = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This Month', 'Last Month'];
  days: any = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  constructor() { }

  ngOnInit() {
    this.generateCalendar('left');
    this.generateCalendar('right');
  }

  generateCalendar(side: string) {
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
  isStartDate(day) {
    if (day.format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
      return true;
    }
    return false;
  }
  isEndDate(day) {
    if (day.format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
      return true;
    }
    return false;
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
    this.generateCalendar('left');
    if (this.rightCalendar.calendar) {
      this.rightCalendar.month.subtract(1, 'month');
      this.generateCalendar('right');
    }
  }
  clickNext() {
    this.leftCalendar.month.add(1, 'month');
    this.generateCalendar('left');
    if (this.rightCalendar.calendar) {
      this.rightCalendar.month.add(1, 'month');
      this.generateCalendar('right');
    }
  }
  clickdate(day, side) {

  }
}
