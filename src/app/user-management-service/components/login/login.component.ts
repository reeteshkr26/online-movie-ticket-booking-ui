import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../Model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  msg='';
  isLoginError:boolean;
  loginSuccess:boolean;
  currentUser:User;
  btnClick:boolean;
  style_variable:boolean;

  constructor(private _router : Router,private loginService:UserService,private dialog:MatDialog) { 
    this.user=new User();
  }

  ngOnInit(): void {
  }

  loginUser(){
    this.btnClick=true;
    this.loginService.userLogin(this.user.email,this.user.password).subscribe(
      (data:User)=>{          
          console.log(data);
          this.btnClick=false;
          this.setUserDetailsInSessionStorage(data.userId,data.userRole);
          this.loginSuccess=true;
          setTimeout(()=>this.loginSuccess=false,4000);
          //alert(sessionStorage.getItem('userId') +" has been Login success")
          this.loginService.loginServiceEvent.next('success');
        
          this._router.navigateByUrl("/");
       
     
         
          //this.displaySuccessMsg();
      },
      (err)=>{
        this.btnClick=false;
        console.log(err.error);
       // this.isLoginError=true;
       
       this.isLoginError=true;
       setTimeout(()=>this.isLoginError=false,4000);
        this._router.navigate(['/login']);
      }
    );

  }
  setUserDetailsInSessionStorage(userId:any,userRole:any){
    console.log("Set User Details");
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('userRole');
          sessionStorage.setItem("userId",userId);
          sessionStorage.setItem('userRole',userRole);
  }
  gotoregistration(){
    this._router.navigate(['/registration'])
  }

  @HostListener("document:scroll")
  scrollFunction(){
    if(document.body.scrollTop>0 || document.documentElement.scrollTop>0){
      this.style_variable=true;
    }
    else{
      this.style_variable=false;
    }
  }
}
