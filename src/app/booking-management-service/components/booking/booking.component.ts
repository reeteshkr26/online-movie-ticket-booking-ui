import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CityService } from 'src/app/common/service/city.service';
import { Movie } from 'src/app/movie-management-service/model/movie.model';
import { Shows } from 'src/app/shows-management-service/model/shows.model';
import { ShowsService } from 'src/app/shows-management-service/service/shows.service';
import { Theatre } from 'src/app/theatre-management-service/model/theatre.model';
import { TheatreService } from 'src/app/theatre-management-service/service/theatre.service';
import { Booking } from '../../model/booking.model';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  style_variable=false;
  movie:Movie;
  booking:Booking;
  selectedCity:string;
  cityList:any[];
  theatreList:Theatre[]=[]
  mainTheatreList:Theatre[]=[]
  showList:Shows[]=[];
  mainShowList:Shows[]=[];
  success:boolean;
  btnClick:boolean;
  isLoad:boolean;
  ticketTotalPrice:number=0;
  gstCharge:number=50;
  ticketPrice:number=100;
  constructor(
    private bookingService:BookingService, 
    private activatedRoute:ActivatedRoute,
    private theatreService:TheatreService,
    private showService:ShowsService,
    private cityService:CityService,
    private router:Router
    ) {
    this.booking=new Booking();
   }

  ngOnInit(): void {
    if((sessionStorage.getItem('userId')!=null)){
      this.cityList=this.cityService.getCity();
      this.getDataFromRoute();
      this.loadAllList()
    }
   
  }

  getDataFromRoute(){
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(data=>{
      this.movie=data;
      console.log(this.movie);
    });
    
  }
  loadAllList(){

    this.theatreService.getTheatreList().subscribe((data)=>{
      console.log("Theatre List-> "+data);
      this.mainTheatreList=data;
    },
    (err)=>{
      console.log(err.error);
    }
    );

    this.showService.getAllShows().subscribe((data)=>{
      console.log("Shows List-> "+data);
      this.mainShowList=data;
    },
    (err)=>{
      console.log(err.error);
    })
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedCity= event.target.value;
    console.log(event.target.value);
    this.theatreList=this.mainTheatreList.filter((theatre)=>theatre.theaterCity==event.target.value);
  }

  onChangeTheatre(event: any){
   // console.log(event.target.value +" "+ this.movie.movieId);
   // this.showList=this.showService.getShowByTheatreIdAndMovieId(event.target.value,this.movie.movieId);
   // console.log(this.showList);

    for(let i=0;i<this.mainShowList.length;i++){
      if(this.mainShowList[i].theaterId==event.target.value && this.mainShowList[i].movieId==this.movie.movieId){
  
        this.showList.push(this.mainShowList[i]);
      }
    }
  }

  onSubmit(f:NgForm){
    if(!f.valid){
      return;
    }
    this.isLoad=true;
    this.btnClick=true;
    console.log(f.value);
    this.booking.customerId=Number(sessionStorage.getItem('userId'));
    this.booking.movieId=this.movie.movieId;
    console.log(this.booking);

   
    this.ticektBooked(this.booking);
    f.reset();

    /*this.bookingService.createBooking(this.booking).subscribe((data)=>{
      console.log(data);
      this.success=true;
      this.btnClick=false;
    },(err)=>{console.log(err.error)})*/
    
    
  }
  calculateCost(seats:number){

    this.ticketTotalPrice=seats * this.ticketPrice;
  
  }

  ticektBooked(booking:Booking){

    this.bookingService.createBooking(booking).subscribe((data)=>{
      console.log(data);
      this.isLoad=false;
      this.router.navigateByUrl('/booking/view-booking');
    },(err)=>{console.log(err.error);
      this.isLoad=false;
    })
  }

  @HostListener("document:scroll")
  scrollFunction(){
    if(document.body.scrollTop>0 || document.documentElement.scrollTop>0){
      this.style_variable=true;
    }
    else{
      this.style_variable=false;
    }
  }
}
