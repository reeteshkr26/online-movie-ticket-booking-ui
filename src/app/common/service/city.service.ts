import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  city:string[]=["Greater Noida","Delhi","Noida","Mumbai","Patna"]
  constructor() { }

  getCity(){
    return this.city;
  }
}
