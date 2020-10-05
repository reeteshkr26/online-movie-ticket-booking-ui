import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/movie.model';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieList:Movie[]=[];
  constructor(private movieService:MovieService) { }

  ngOnInit(): void {
    if((sessionStorage.getItem('userId')!=null)){
      this.loadMovieList();
    }
    
  }
  loadMovieList(){
    this.movieService.getMovieList().subscribe((data:Movie[])=>{
      this.movieList=data;
    },(err)=>{
      console.log(err.error);
    })
  }

}
