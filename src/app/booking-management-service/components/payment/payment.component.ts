import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Booking } from '../../model/booking.model';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  booking:Booking;
  ticketPrice:number=100;
  ticketTotalPrice:number;
  gstCharge:number=50;
  isLoad:boolean;
  constructor(private bookingService:BookingService,private route:Router,private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    this.getDataFromRoute();
  }

  getDataFromRoute(){
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(data=>{
      this.booking=data;
      this.ticketTotalPrice=this.booking.noOfSeats * this.ticketPrice;
      console.log(this.booking);
    });
    
  }
  ticektBooked(){
    this.isLoad=true;
    this.bookingService.createBooking(this.booking).subscribe((data)=>{
      console.log(data);
      this.isLoad=false;
      this.route.navigateByUrl('/booking/view-booking');
    },(err)=>{console.log(err.error);
      this.isLoad=false;
    })
  }
}
