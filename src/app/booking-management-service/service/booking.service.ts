import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../model/booking.model';
import { Ticket } from '../model/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl:string;
  constructor(private http:HttpClient) { 
    this.baseUrl=`${environment.baseMWUrl}/booking-service/api/bookings`;
  }

  getAllBookings(customerId:number):Observable<Ticket[]>{

    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets/${customerId}`)

  }
  createBooking(booking:Booking):Observable<Ticket>
  {
    return this.http.post<Ticket>(`${this.baseUrl}`,booking);
  }

  cancelTicket(ticket:Ticket):Observable<Ticket>{
    return this.http.put<Ticket>(`${this.baseUrl}/tickets`,ticket);
  }
}
