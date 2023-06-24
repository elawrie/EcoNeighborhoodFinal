import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})

export class CalendarioComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    contentHeight: 'auto',
    showNonCurrentDates: true, // Hide non-current dates (When false)
    views: {
      month: {
        titleFormat: { month: 'long', year: 'numeric' }, // Customize the month title format (optional)
        fixedWeekCount: false, // Allow variable number of weeks
      },
    },
    headerToolbar: {
      left: 'prev,today',
      center: 'title',
      right: 'next',
    },
  };
};
