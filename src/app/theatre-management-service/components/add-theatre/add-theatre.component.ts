import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CityService } from 'src/app/common/service/city.service';
import { Theatre } from '../../model/theatre.model';
import { TheatreService } from '../../service/theatre.service';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent implements OnInit {

  style_variable=false;
  city:string;
  theaterModel:Theatre;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  namePattern = "^[a-zA-Z ]*$";
  added:boolean;
  errorMsg:any;
  errorOccurs:boolean;
  btnClick:boolean;

  cityList:string[];
  constructor(private theaterService:TheatreService,private cityService:CityService) {
    this.theaterModel=new Theatre();
   }

  ngOnInit(): void {
     this.cityList=this.cityService.getCity();
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

  onSubmit(f:NgForm){
    if(f.invalid){
      return;
    }
    this.btnClick=true;
    this.theaterModel.theaterCity=this.city;
    console.log(this.theaterModel);
    this.theaterService.addTheatre(this.theaterModel).subscribe((data)=>{
      console.log("added");
      this.btnClick=false;
      this.added=true;
      setTimeout(()=>this.added=false,4000);
      f.reset();
      console.log(data);
      },(err)=>{
        this.btnClick=false;
        this.errorMsg=err.message;
        this.errorOccurs=true;
        setTimeout(() => this.errorOccurs = false, 5000);
        f.reset();
      console.log(err.error);
    });
  }
}
