import { Component, OnInit } from '@angular/core';
import { Screen } from '../../model/screen.model';
import { ScreenService } from '../../service/screen.service';

@Component({
  selector: 'app-view-screen',
  templateUrl: './view-screen.component.html',
  styleUrls: ['./view-screen.component.css']
})
export class ViewScreenComponent implements OnInit {

  screenList:Screen[]=[];
  searchText:string='';
  isLoad:boolean;
  success:boolean;

  constructor(private screenService:ScreenService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('userId')!=null){
      this.isLoad=true;
      this.loadScreenList();
    }
  }

  loadScreenList(){
    this.screenService.getAllScreens().subscribe((data)=>{
      this.screenList=data;
      this.isLoad=false;
    },(err)=>{
      console.log(err.error);
      this.isLoad=false;
    });
  }

  onSearch(screen:Screen){
    return (screen.theaterName.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase())) != -1;
    
  }
  deleteScreen(screen:Screen){

    if(confirm("Are you sure want to delete?")){
      this.screenService.deleteByScreenId(screen.screenId).subscribe(
        (data)=>{
          //this.movieList = this.movieList.filter(u => u.movieId !== movie.movieId);
          const deletedContrat = this.screenList.find(x => x.screenId === screen.screenId);
          this.screenList.splice(this.screenList.indexOf(deletedContrat), 1);
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
