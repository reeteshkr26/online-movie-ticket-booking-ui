import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../model/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movieItem:Movie;
  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  movieDetails(movie:Movie){
      this.router.navigateByUrl('/booking',{state:movie});
  }
}
