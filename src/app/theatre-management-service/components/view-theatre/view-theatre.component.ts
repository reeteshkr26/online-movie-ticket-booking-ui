import { Component, OnInit } from '@angular/core';
import { Theatre } from '../../model/theatre.model';
import { TheatreService } from '../../service/theatre.service';

@Component({
  selector: 'app-view-theatre',
  templateUrl: './view-theatre.component.html',
  styleUrls: ['./view-theatre.component.css']
})
export class ViewTheatreComponent implements OnInit {

  theatreList:Theatre[]=[];
  searchText:string='';
  isLoad:boolean;
  success:boolean;
  constructor(private theatreService:TheatreService) { }

  ngOnInit(): void {
    this.isLoad=true;
    this.loadTheatreList();
  }

  loadTheatreList(){
    this.theatreService.getTheatreList().subscribe((data)=>{
      this.theatreList=data;
      this.isLoad=false;
    },(err)=>{
      console.log(err.error);
    });
  }

  onSearch(theatre:Theatre){
    return (theatre.theaterName.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase())) != -1;
    
  }
  deleteTheater(theatre:Theatre){

    if(confirm("Are you sure want to delete?")){
      this.theatreService.deleteTheater(theatre.theaterId).subscribe(
        (data)=>{
          //this.movieList = this.movieList.filter(u => u.movieId !== movie.movieId);
          const deletedContrat = this.theatreList.find(x => x.theaterId === theatre.theaterId);
          this.theatreList.splice(this.theatreList.indexOf(deletedContrat), 1);
          this.success=true;
         // this.loadMovieList();
           setTimeout(()=>this.success=false,4000);
        },
        (err)=>{
          console.log(err.message);
        }
      );
    }
  }

}
