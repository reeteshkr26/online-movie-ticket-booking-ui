import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { AddMovieComponent } from './movie-management-service/components/add-movie/add-movie.component';
import { ViewMovieComponent } from './movie-management-service/components/view-movie/view-movie.component';
import { BookingComponent } from './booking-management-service/components/booking/booking.component';
import { ViewBookingComponent } from './booking-management-service/components/view-booking/view-booking.component';
import { PaymentComponent } from './booking-management-service/components/payment/payment.component';
import { LoginComponent } from './user-management-service/components/login/login.component';
import { RegistrationComponent } from './user-management-service/components/registration/registration.component';
import { HeaderComponent } from './common/components/header/header.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { AboutUsComponent } from './common/components/about-us/about-us.component';
import { ContactUsComponent } from './common/components/contact-us/contact-us.component';
import { HomeComponent } from './common/components/home/home.component';
import { NavComponent } from './common/components/nav/nav.component';

import{FlexLayoutModule} from '@angular/flex-layout';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

import { MovieService } from './movie-management-service/service/movie.service';

import {HttpClientModule} from '@angular/common/http';
import { MovieComponent } from './movie-management-service/components/movie/movie.component';
import { MovieItemComponent } from './movie-management-service/components/movie-item/movie-item.component';
import { AddTheatreComponent } from './theatre-management-service/components/add-theatre/add-theatre.component';
import { ViewTheatreComponent } from './theatre-management-service/components/view-theatre/view-theatre.component';
import { AddShowComponent } from './shows-management-service/components/add-show/add-show.component';
import { ViewShowsComponent } from './shows-management-service/components/view-shows/view-shows.component';
import { AddScreenComponent } from './screen-management-service/components/add-screen/add-screen.component';
import { ViewScreenComponent } from './screen-management-service/components/view-screen/view-screen.component';
import { BookingService } from './booking-management-service/service/booking.service';
import { ShowsService } from './shows-management-service/service/shows.service';
import { TheatreService } from './theatre-management-service/service/theatre.service';
import { ScreenService } from './screen-management-service/service/screen.service';
import { CancelBookingComponent } from './booking-management-service/components/cancel-booking/cancel-booking.component';
import { UserService } from './user-management-service/service/user.service';
import { AuthGuard } from './router-guard/auth.guard';
import { LoginGuard } from './router-guard/login.guard';
import { AdminGuard } from './router-guard/admin.guard';
import { CustomerGuard } from './router-guard/customer.guard';
import { CityService } from './common/service/city.service';
import { SearchTheatreComponent } from './theatre-management-service/components/search-theatre/search-theatre.component';

@NgModule({
  declarations: [
    AppComponent,
    AddMovieComponent,
    ViewMovieComponent,
    BookingComponent,
    ViewBookingComponent,
    PaymentComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    HomeComponent,
    NavComponent,
    MovieComponent,
    MovieItemComponent,
    AddTheatreComponent,
    ViewTheatreComponent,
    AddShowComponent,
    ViewShowsComponent,
    AddScreenComponent,
    ViewScreenComponent,
    CancelBookingComponent,
    SearchTheatreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule
  ],
  entryComponents:[CancelBookingComponent],
  providers: [AuthGuard,LoginGuard,AdminGuard,CustomerGuard,
    MovieService,BookingService,UserService,ShowsService,CityService,
    TheatreService,ScreenService,{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
