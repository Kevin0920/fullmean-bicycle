import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainService } from './main.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingComponent } from './listing/listing.component';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BrowseComponent,
    ListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
