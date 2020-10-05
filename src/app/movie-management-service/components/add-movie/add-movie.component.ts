import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MovieLanguage } from '../../model/movie.language.model';
import { Movie } from '../../model/movie.model';
import { MovieType } from '../../model/movie.type.model';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  style_variable=false;
  movieLanguageList:MovieLanguage[];
  movieTypeList:MovieType[]=[];
  selectedLanguage:MovieLanguage[] = [];
  selectedMovieType:MovieType[]=[];
  dropdownSettingsForLanguage:IDropdownSettings;
  dropdownSettingsForType:IDropdownSettings;
  movie:Movie;
  success:boolean;
  errorMsg:any;
  errorOccurs:boolean;
  btnClick:boolean;

  constructor(private movieService:MovieService) { 
    this.movie=new Movie();
  }

  ngOnInit(): void {
   this.configureDropDownList();
  }

  configureDropDownList(){
    this.movieLanguageList = [
      { languageId: 1, languageValue: 'Hindi' },
      { languageId: 2, languageValue: 'English' },
      { languageId: 3, languageValue: 'Tamil' },
      { languageId: 4, languageValue: 'Bhojpuri' },
      { languageId: 5, languageValue: 'Marathi' }
    ];
    this.movieTypeList=[
      {movieTypeId:1,movieType:"Drama"},
      {movieTypeId:2,movieType:"Fiction"},
      {movieTypeId:3,movieType:"Horror"},
      {movieTypeId:4,movieType:"Action"},
      {movieTypeId:5,movieType:"Thriller"},
      {movieTypeId:6,movieType:"Romantic"}

    ];
    this.dropdownSettingsForLanguage = {
      singleSelection: false,
      idField:'languageId',
      textField: 'languageValue',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsForType={
      singleSelection: false,
      idField:'movieTypeId',
      textField: 'movieType',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
    console.log(f.value);
    if(!f.valid){
      return;
    }
    this.btnClick=true;
    let arrayOfLanguage:string[]=this.selectedLanguage.map(
      function(language){
      return language.languageValue;
      }
     );
     this.movie.movieLanguage=arrayOfLanguage;
     console.log(arrayOfLanguage);

     let arrOfMovieType:string[]=this.selectedMovieType.map(
      function(type){
      return type.movieType;
      }
     );
     this.movie.movieType=arrOfMovieType;
     console.log(arrOfMovieType);

   this.movieService.createMovie(this.movie).subscribe((data)=>{

      console.log("added");
      this.btnClick=false;
      this.success=true;
      setTimeout(() => this.success = false, 6000);
      console.log(data);

    },(err)=>{

      this.btnClick=false;
      this.errorMsg=err.message;
      this.errorOccurs=true;
      setTimeout(() => this.errorOccurs = false, 5000);
      console.log(err.message);
    });

    f.reset();
  }

}
