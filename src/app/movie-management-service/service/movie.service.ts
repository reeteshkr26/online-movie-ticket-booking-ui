import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../model/movie.model';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl:string;
  public cartServiceEvent = new BehaviorSubject({});

  movieList:Movie[]=[];
  constructor(private http:HttpClient) { 
    this.baseUrl=`${environment.baseMWUrl}/movie-service/api/movies`
  }

  getMovieList():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.baseUrl}`).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }
  createMovie(movie:Movie):Observable<Movie>{
    return this.http.post<Movie>(`${this.baseUrl}`,movie).pipe(
      retry(1),
      catchError(this.handleError)
    );;
  }
  getMovieByName(name:string):Observable<Movie>{
    return this.http.get<Movie>(`${this.baseUrl}/movieName/${name}`);
  }
  getMovieById(id:number):Observable<Movie>{
    return this.http.get<Movie>(`${this.baseUrl}/${id}`);
  }

  deleteMovie(movieId:number):Observable<any>{
    console.log(movieId);
    return this.http.delete(`${this.baseUrl}/${movieId}`);
  }
  
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
   
    return throwError(errorMessage);
  }
}
