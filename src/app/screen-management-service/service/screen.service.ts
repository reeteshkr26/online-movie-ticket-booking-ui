import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Screen } from '../model/screen.model';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  baseUrl:string;
  constructor(private http:HttpClient) { 
    this.baseUrl=`${environment.baseMWUrl}/screen-service/api/screens`;
  }

  addScreen(screen:Screen):Observable<Screen>{
    return this.http.post<Screen>(`${this.baseUrl}/addScreen`,screen);
  }

  updateScreen(screen:Screen):Observable<Screen>{
    return this.http.put<Screen>(`${this.baseUrl}/updateScreen`,screen);
  }

  getAllScreens():Observable<Screen[]>{
    return this.http.get<Screen[]>(`${this.baseUrl}`);
  }

  getScreenByScreenId(screenId:number):Observable<Screen>{
    return this.http.get<Screen>(`${this.baseUrl}/${screenId}`);
  }

  getScreenByTheatreId(theaterId:number):Observable<Screen>{
    return this.http.get<Screen>(`${this.baseUrl}/getByTheaterId/${theaterId}`);
  }

  deleteByScreenId(screenId:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/deleteByScreenId/${screenId}`);
  }

  deleteByTheaterId(theaterId:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/deleteByTheatreId/${theaterId}`);
  }
}
