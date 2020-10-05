import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CityService } from 'src/app/common/service/city.service';
import { Movie } from 'src/app/movie-management-service/model/movie.model';
import { MovieService } from 'src/app/movie-management-service/service/movie.service';
import { Screen } from 'src/app/screen-management-service/model/screen.model';
import { ScreenService } from 'src/app/screen-management-service/service/screen.service';
import { Theatre } from 'src/app/theatre-management-service/model/theatre.model';
import { TheatreService } from 'src/app/theatre-management-service/service/theatre.service';
import { Shows } from '../../model/shows.model';
import { ShowsService } from '../../service/shows.service';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.css']
})
export class AddShowComponent implements OnInit {

  
  show:Shows;

  isValidFormSubmitted = false;
  style_variable = false;
  selectedCity: string;
  btnClick:boolean;
  added:boolean;
  errorMsg:string;
  errorOccurs:boolean;
  message:boolean;

  showNameList: string[] = [
    "Morning",
    "Afternoon",
    "Evening",
    "Night"
  ];
  cityList:string[]=[];
  movieList:Movie[]=[];
  screenList:Screen[]=[];
  theaterList:Theatre[]=[];
  newTheaterList:Theatre[]=[];
  newScreenList:Screen[]=[];
  constructor(
    private showService:ShowsService,
    private cityService:CityService,
    private theaterService:TheatreService,
    private movieService:MovieService,
    private screenService:ScreenService) {
      this.show=new Shows();
   }

  ngOnInit(): void {
    if((sessionStorage.getItem('userId')!=null) && (sessionStorage.getItem('userRole')=='ADMIN')){
      this.cityList=this.cityService.getCity();
      this.loadAllList();
    }
  }

  loadAllList(){
    this.movieService.getMovieList().subscribe((data)=>{
      console.log("Movie Lsit-> "+data);
      this.movieList=data;
    },
    (err)=>{
      console.log(err.error);
    }
    );

    this.theaterService.getTheatreList().subscribe((data)=>{
      console.log("Theatre List-> "+data);
      this.theaterList=data;
    },
    (err)=>{
      console.log(err.error);
    }
    );

    this.screenService.getAllScreens().subscribe((data)=>{
      console.log("Screen List-> "+data);
      this.screenList=data;
    },
    (err)=>{
      console.log(err.error);
    }
    );
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selectedCity= event.target.value;
    console.log(event.target.value);
    this.newTheaterList=this.theaterList.filter((theatre)=>theatre.theaterCity==event.target.value);
  }

  changeScreenInfo(event:any){
    this.newScreenList=this.screenList.filter((screen)=>screen.theaterId==event.target.value);
  }

  onSubmit(f: NgForm) {
    //this.show.showName = this.name;
    if(f.invalid){
      return;
    }
    this.btnClick=true;
    console.log("submit button clicked");
    console.log(f.value);
    this.show.showId=0;
    this.showService.addShow(this.show).subscribe((data) => {
      console.log("inside service");
      f.reset();
      this.btnClick=false;
      this.added=true;
      setTimeout(()=>this.added=false,4000);
      console.log(data);
    }, (err) => {
      f.reset();
      this.btnClick=false;
      this.errorMsg=err.error.message;
      this.errorOccurs=true;
      setTimeout(() => this.errorOccurs = false, 4000);
      console.log(err.error);
    });

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
