import { MovieLanguage } from './movie.language.model';
import { MovieType } from './movie.type.model';

export class Movie{
   public movieId:number;
   public movieName:String;
   public movieDirector:string;
   public movieActor:string;
   public movieActress:string;
   public movieLanguage:string[];
   public movieLength:number;
   public movieRating:number;
   public releasedDate:Date;
   public movieType:string[];

   constructor(){}

}