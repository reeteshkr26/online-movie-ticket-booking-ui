import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/common/service/city.service';
import { Theatre } from '../../model/theatre.model';
import { TheatreService } from '../../service/theatre.service';

@Component({
  selector: 'app-search-theatre',
  templateUrl: './search-theatre.component.html',
  styleUrls: ['./search-theatre.component.css']
})
export class SearchTheatreComponent implements OnInit {

  city:string;
  id:number;
  theaterModelList:Theatre[];
  theatersByCity:boolean;
  showTheaterById:boolean;
  theaterModel:Theatre;
  cityList:string[];
  constructor(private theaterService:TheatreService,private cityService:CityService) { }

  ngOnInit(): void {
    this.cityList=this.cityService.getCity();
  }

  findTheaterByCity(){
    console.log(this.city);
    this.theaterService.getTheaterListByCity(this.city).subscribe((data:Theatre[])=>{
      this.theaterModelList=data;
      this.theatersByCity=true;
      this.showTheaterById=false;
    },(err)=>{
      console.log(err.error);
    });
  }

  showTheater(){
    console.log(this.id);
    this.theaterService.showTheaterById(this.id).subscribe((data:Theatre)=>{
      this.theaterModel=data;
      this.showTheaterById=true;
    },(err)=>{
      console.log(err.error);
      this.theatersByCity=false;
    });

  }

}
