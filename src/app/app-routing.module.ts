import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking-management-service/components/booking/booking.component';
import { PaymentComponent } from './booking-management-service/components/payment/payment.component';
import { ViewBookingComponent } from './booking-management-service/components/view-booking/view-booking.component';
import { AboutUsComponent } from './common/components/about-us/about-us.component';
import { ContactUsComponent } from './common/components/contact-us/contact-us.component';
import { HomeComponent } from './common/components/home/home.component';
import { AddMovieComponent } from './movie-management-service/components/add-movie/add-movie.component';
import { MovieComponent } from './movie-management-service/components/movie/movie.component';
import { ViewMovieComponent } from './movie-management-service/components/view-movie/view-movie.component';
import { AdminGuard } from './router-guard/admin.guard';
import { AuthGuard } from './router-guard/auth.guard';
import { CustomerGuard } from './router-guard/customer.guard';
import { LoginGuard } from './router-guard/login.guard';
import { AddScreenComponent } from './screen-management-service/components/add-screen/add-screen.component';
import { ViewScreenComponent } from './screen-management-service/components/view-screen/view-screen.component';
import { AddShowComponent } from './shows-management-service/components/add-show/add-show.component';
import { ViewShowsComponent } from './shows-management-service/components/view-shows/view-shows.component';
import { AddTheatreComponent } from './theatre-management-service/components/add-theatre/add-theatre.component';
import { SearchTheatreComponent } from './theatre-management-service/components/search-theatre/search-theatre.component';
import { ViewTheatreComponent } from './theatre-management-service/components/view-theatre/view-theatre.component';
import { LoginComponent } from './user-management-service/components/login/login.component';
import { RegistrationComponent } from './user-management-service/components/registration/registration.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full" },
  { path: "movie/add-movie", component: AddMovieComponent,canActivate:[AuthGuard,AdminGuard] },
  { path: "movie/view-movie", component: ViewMovieComponent,canActivate:[AuthGuard,AdminGuard] },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'login', component: LoginComponent,canActivate:[LoginGuard] },
  { path: 'registration', component: RegistrationComponent,canActivate:[LoginGuard] },
  { path: 'booking', component: BookingComponent,canActivate:[AuthGuard,CustomerGuard] },
  { path: 'booking/payment', component: PaymentComponent,canActivate:[AuthGuard,CustomerGuard] },
  { path: 'booking/view-booking', component: ViewBookingComponent,canActivate:[AuthGuard,CustomerGuard] },
  { path: 'movies', component: MovieComponent,canActivate:[AuthGuard,CustomerGuard] },
  {path:'theatre/add-theatre',component:AddTheatreComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'theatre/view-theatre',component:ViewTheatreComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'theatre/search-theatre',component:SearchTheatreComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'screen/add-screen',component:AddScreenComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'screen/view-screen',component:ViewScreenComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'shows/add-show',component:AddShowComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'shows/view-show',component:ViewShowsComponent,canActivate:[AuthGuard,AdminGuard]}
  //{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
