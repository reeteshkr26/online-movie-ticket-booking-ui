import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user-management-service/service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  header_variable=false;
  isLogin:boolean;
  isAdmin:boolean;
  isCustomer:boolean;
  constructor(private router:Router,private loginService:UserService) { 
    this.loginService.loginServiceEvent.subscribe((data)=>{
      this.toCheckUserRole();
    })
  }

  ngOnInit(): void {
    this.toCheckUserRole();
  }


  toCheckUserRole(){
    if(sessionStorage.getItem('userId')!=null){
      console.log("check user")
        this.isLogin=true;
        if(sessionStorage.getItem('userRole')=='ADMIN'){
          this.isAdmin=true;
          this.isCustomer=false;
        }
        if(sessionStorage.getItem('userRole')=='CUSTOMER_USER'){
          this.isAdmin=false;
          this.isCustomer=true;
        }
        
    }
    else{
      this.isLogin=false;
    }
  }
  logoutUser(){
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
    this.isLogin=false;
    this.isAdmin=false;
    this.isCustomer=false;
    alert("Logout sucess..!");
    this.router.navigateByUrl("/");

  }

  @HostListener("document:scroll")
  scrollFunction(){
    if(document.body.scrollTop>0 || document.documentElement.scrollTop>0){
      this.header_variable=true;
    }
    else{
      this.header_variable=false;
    }
  }

}
