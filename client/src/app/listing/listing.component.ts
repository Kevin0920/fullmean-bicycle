import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../main.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  bike = {
    title: "",
    description: "",
    price: "",
    location: "",
    image_url: ""
  }
  user;
  mybike;


  editbike = {
    title: "",
    description: "",
    price: "",
    location: "",
    image_url: ""

  }

  constructor(private _service: MainService, private _router: Router) { }

  createBike() {
    console.log("create success from listing");
    this._service.createBike(this.bike,
      (res) => {
        console.log(res.json());
      });
    this.bike = {
      title: "",
      description: "",
      price: "",
      location: "",
      image_url: ""
    };
    this._router.navigate(['/browse']);
  }

  updateBike(id, data) {
    console.log("from update component before update: ", data);
    this._service.update(id, data, (res) => {
      console.log(res);
    });
    this.editbike = {
      title: "",
      description: "",
      price: "",
      location: "",
      image_url: ""

    };
    this._router.navigate(["browse"]);

  }




  logout() {
    this._service.logout();
    this._router.navigate(['/'])
  }

  ngOnInit() {
    if(localStorage.user == undefined) {
      this._router.navigate(['/']);
    }
    this.user = this._service.user;
    this._service.retrMyBikes((res) => {
     console.log("from listing: ", res._bikes);
     // this.user = res;
     this.mybike = res._bikes;
   })
  }

  destroy(id) {
    console.log("before delete from listing ");
    this._service.deleteBike(id, (res) => {
      console.log("destroy from listing: ", res)
    });
    this._router.navigate(['/browse']);

  }

}
