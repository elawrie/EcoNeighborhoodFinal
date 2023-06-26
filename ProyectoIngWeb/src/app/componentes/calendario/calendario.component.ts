import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { SignInService } from '../../sign-in-service.service';

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

  constructor(private http: HttpClient, private signInService: SignInService) {};

  ngOnInit(): void {
    //const email: any = this.signInService.signInData.email;
    const email: any = 'hola@hola.com'
    this.fetchEvents(email);//Se llama función para extraer datos de usuario//
  }

 
  fetchEvents(email: string): void {
    const params = new HttpParams().set('email', email); 
    const url = 'http://localhost:3000/calendario';
    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        console.log("Se extraen exitosamente info de usuario a calendario: ", response);
        const events = this.formatEvents(response);
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
        const fechaInicio = new Date('2023-06-26');
        const fechaTermino = new Date(fechaInicio);
        fechaTermino.setDate(fechaTermino.getDate() + 3);
        return {
          title: item.Contenido,
          start: fechaInicio.toISOString(),
          end: fechaTermino.toISOString(),
          //start: '2023-06-26',
          //end: '2023-06-29',
          contenido: item.Contenido,
        };
      });
    } else {
      console.error('Unexpected data format:', data);
      return []; //Array vacio para manejar errores//
    }
  };
   
  
};