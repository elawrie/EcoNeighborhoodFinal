import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClient, HttpParams } from '@angular/common/http'; 

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})

export class CalendarioComponent implements OnInit{
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

  constructor(private http: HttpClient) {};

  ngOnInit(): void {
    const email = 'hola@hola.com';
    this.fetchEvents(email);//Se llama función para extraer datos de usuario//
  }

 
  fetchEvents(email: string): void {
    const params = new HttpParams().set('email', email); 
    const url = 'http://localhost:3000/calendario';
    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        const events = this.formatEvents(response);
        console.log("Se extraen exitosamente info de usuario a calendario: ", events);
        this.calendarOptions.events = events;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  };

  formatEvents(data: { resultado: any[] }): any[] {
    const resultado = data.resultado; 
  
    if (Array.isArray(resultado)) {
      return resultado.map((item) => {
        return {
          title: item.email,
          start: '2023-06-26',
          end: '2023-06-30',
          email: item.email,
        };
      });
    } else {
      console.error('Unexpected data format:', data);
      return []; //Array vacio para manejar errores//
    }
  };
   
  
};