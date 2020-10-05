import { Component, OnInit } from '@angular/core';
import { Shows } from '../../model/shows.model';
import { ShowsService } from '../../service/shows.service';

@Component({
  selector: 'app-view-shows',
  templateUrl: './view-shows.component.html',
  styleUrls: ['./view-shows.component.css']
})
export class ViewShowsComponent implements OnInit {

  showList:Shows[]=[];
  isLoad:boolean;
  success:boolean;
  searchText:string='';
  constructor(private showService:ShowsService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('userId')!=null){
      this.isLoad=true;
      this.loadShowsList();
    }
  }

  loadShowsList(){
    this.showService.getAllShows().subscribe((data)=>{
      console.log(data);
      this.isLoad=false;
      this.showList=data;
    },(err)=>{
      console.log(err.error);
      this.isLoad=false;
    });
  }

  onSearch(show: Shows) {
    return (show.theaterName.toString().toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase())) != -1;

  }
  public deleteShow(show: Shows) {
    this.showService.deleteShow(show.showId).subscribe((data) => {
      this.showList = data
    },(err)=>{console.log(err.error);
    });
  }
}
