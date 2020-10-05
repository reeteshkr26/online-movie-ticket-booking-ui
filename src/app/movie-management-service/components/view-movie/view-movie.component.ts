import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { Movie } from '../../model/movie.model';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit {
  movieList:Movie[]=[];
  searchText:string='';
  loadData:boolean;
  success:boolean;
  constructor(private movieService:MovieService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('userId')!=null){
      this.loadData=true;
      this.loadMovieList();
    }
  
  }

  onSearch(movie:Movie){
    return (movie.movieName.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase())) != -1;
    
  }
  loadMovieList(){
    
    this.movieService.getMovieList().subscribe((data:Movie[])=>{
      this.movieList=data;
      console.log(data);
      this.loadData=false;
    },(err)=>{
      this.loadData=false;
      console.log(err.error);})
  }

  deleteMovie(movie:Movie){
    if(confirm("Are you sure want to delete?")){
      this.movieService.deleteMovie(movie.movieId).subscribe(
        (data)=>{
          //this.movieList = this.movieList.filter(u => u.movieId !== movie.movieId);
          const deletedContrat = this.movieList.find(x => x.movieId === movie.movieId);
          this.movieList.splice(this.movieList.indexOf(deletedContrat), 1);
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
