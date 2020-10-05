import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CityService } from 'src/app/common/service/city.service';
import { Theatre } from 'src/app/theatre-management-service/model/theatre.model';
import { TheatreService } from 'src/app/theatre-management-service/service/theatre.service';
import { Screen } from '../../model/screen.model';
import { ScreenService } from '../../service/screen.service';

@Component({
  selector: 'app-add-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.css']
})
export class AddScreenComponent implements OnInit {

  style_variable=false;
  city:string;
  added:boolean;
  errorMsg:any;
  errorOccurs:boolean;
  btnClick:boolean;
  cityList:string[];
  screen:Screen;
  theaterList:Theatre[]=[];
  newTheaterList:Theatre[]=[];
  seatCapacityList:number[]=[20,50,70,100,150];
  selectedCity:string
  
  constructor(private theaterService:TheatreService,private cityService:CityService,private screenService:ScreenService) {
    this.screen=new Screen();
   }

  ngOnInit(): void {
    if((sessionStorage.getItem('userId')!=null) && (sessionStorage.getItem('userRole')=='ADMIN')){
      this.cityList=this.cityService.getCity();
      this.loadTheatreList();
    }
    
  }

  loadTheatreList(){
    this.theaterService.getTheatreList().subscribe((data)=>{
      this.theaterList=data;
    },(err)=>{
      console.log(err.error);
    });
  }

  onSubmit(f:NgForm){
    if(f.invalid){
      return;
    }

    this.btnClick=true;
    this.screen.availableSeats=this.screen.totalSeats;
    this.screenService.addScreen(this.screen).subscribe((data)=>{
      console.log("added");
      this.btnClick=false;
      this.added=true;
      setTimeout(()=>this.added=false,4000);
      f.reset();
      console.log(data);
    },
    (err)=>{
      this.btnClick=false;
      this.errorMsg=err.error.message;
      this.errorOccurs=true;
      setTimeout(() => this.errorOccurs = false, 5000);
      f.reset();
    console.log(err.error);
    });
  }


  selectChangeHandler(event:any){
    this.selectedCity= event.target.value;
    console.log(event.target.value);
    this.newTheaterList=this.theaterList.filter((theatre)=>theatre.theaterCity==event.target.value);
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
