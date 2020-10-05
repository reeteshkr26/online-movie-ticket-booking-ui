import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ticket } from '../../model/ticket.model';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {

  reason:string;
  otherReason:string;


  reasonList:string[]=["Mood Changed",
                      "Booked by Mistake",
                      "I want to book in other show",
                      "Theatre is not good"

                  ]
  constructor(@Inject(MAT_DIALOG_DATA) private data:Ticket, private bookingService:BookingService,private router:Router,private dialogRef:MatDialogRef<CancelBookingComponent>) { }

  ngOnInit(): void {
  }

  cancelTicket(){
    this.bookingService.cancelTicket(this.data).subscribe(
      (data)=>{
          alert("your order has been cancelled..")
          this.dialogRef.close();
          this.router.navigate(['movies']);
    },(err)=>{
      alert("Error while during cancel the order..")
      this.dialogRef.close();
    })
  }
  
}
