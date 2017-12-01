import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingComponent } from './listing/listing.component';


const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "browse", pathMatch: "full", component: BrowseComponent},
  {path: "list", pathMatch: "full", component: ListingComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
