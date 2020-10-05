import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from '../../model/ticket.model';
import { BookingService } from '../../service/booking.service';
import { CancelBookingComponent } from '../cancel-booking/cancel-booking.component';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

  bookingList:Ticket[]=[];
  constructor(private bookingService:BookingService,private dialog:MatDialog) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('userId')!=null){
      this.loadBookingsList();
    }
    
  }

  loadBookingsList(){
      this.bookingService.getAllBookings(Number(sessionStorage.getItem('userId'))).subscribe((data)=>{
        console.log(data);
        this.bookingList=data;
      },(err)=>{console.log(err.error);})
  }

  openCancelPopup(ticket:Ticket){

    let dialogRef= this.dialog.open(CancelBookingComponent,{data:ticket});
    dialogRef.disableClose=true;
  }

}
