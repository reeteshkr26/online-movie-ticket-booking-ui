import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string;
  currentUser:User;
  loginServiceEvent = new Subject<string>();
  
  constructor(private http:HttpClient) {
    this.baseUrl=`${environment.baseMWUrl}/user-service/api/user`;

   }

  userLogin(email:string,password:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/login/${email}/${password}`);
   
   }
   loggedIn():boolean{
     return !!sessionStorage.getItem('userId');
   }
}
