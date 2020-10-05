import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Theatre } from '../model/theatre.model';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  theatreList:Theatre[]=[]
  baseUrl:string;
  constructor(private http:HttpClient) { 
    this.baseUrl=`${environment.baseMWUrl}/theatre-service/api/theaters`;
  }

  getTheatreList():Observable<Theatre[]>{
    return this.http.get<Theatre[]>(`${this.baseUrl}`);
  }
  addTheatre(theatre:Theatre):Observable<Theatre>{
    return this.http.post<Theatre>(`${this.baseUrl}/addTheater`,theatre);

  }
  deleteTheater(theaterId: number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/${theaterId}`);
  }

  getTheaterListByCity(theaterCity: string):Observable<Theatre[]>{
    return this.http.get<Theatre[]>(`${this.baseUrl}/city/${theaterCity}`);
  }

  showTheaterById(theaterId: number):Observable<Theatre>{
    return this.http.get<Theatre>(`${this.baseUrl}/${theaterId}`);
  }

  getTheatreListByCityName(city:string):Theatre[]{

    this.getTheatreList().subscribe((data)=>{
      this.theatreList=data;
    },(err)=>{console.log(err.error);
    });
    
    return this.theatreList.filter((theatre)=>theatre.theaterCity==city); 

}
}
