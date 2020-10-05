import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shows } from '../model/shows.model';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

showsList:Shows[]=[];
baseUrl:string;
  constructor(private http:HttpClient) {
    this.baseUrl=`${environment.baseMWUrl}/show-service/api/shows`;
   }

   addShow(show:Shows):Observable<Shows>{
      return this.http.post<Shows>(`${this.baseUrl}/addShow`,show);
   }
   getAllShows():Observable<Shows[]>{
     return this.http.get<Shows[]>(`${this.baseUrl}`);
   }
   getShowById(showId:number):Observable<Shows>{
    return this.http.get<Shows>(`${this.baseUrl}/getShow/${showId}`);
   }
   getShowByTheaterId(theaterId:number):Observable<Shows[]>{
    return this.http.get<Shows[]>(`${this.baseUrl}/showsInTheater/${theaterId}`);
   }

   deleteShow(showId:number):Observable<Shows[]>{
    return this.http.delete<Shows[]>(`${this.baseUrl}/${showId}`);
   }
  getShowsList(){
    this.getAllShows().subscribe((data)=>{
      console.log(data);
      this.showsList=data;
    },(err)=>{console.log(err.error);})
  }
  getShowByTheatreIdAndMovieId(theatreId:number,movieId:number):Shows[]{
    console.log(theatreId+" "+movieId);
    let resShowList:Shows[]=[];
    for(let i=0;i<this.showsList.length;i++){
      if(this.showsList[i].theaterId==theatreId && this.showsList[i].movieId==movieId){
        console.log(this.showsList[i]);
        resShowList.push(this.showsList[i]);
      }
    }
   return resShowList;
  }
}
