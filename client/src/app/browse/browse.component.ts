import { Router } from '@angular/router';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  bikes;
  user;
  creater = {
    first_name: "",
    email: ""
  };
  search;
  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
    if(localStorage.user == undefined) {
      this._router.navigate(['/']);
    }
    this.user = this._service.user;
    this._service.retrieveAllBike((res) => {
      console.log("from browse com: ", res)
      this.bikes = res;
    })
  }

  connect(id) {
    console.log(id);
    this._service.findCreater(id, (res) => {
      console.log("from browse: ", res);
        this.creater = res;
        
      }
    )
    
  }

  delete(id) {
    this._service.deleteBike(id, (res) => {
      console.log("from browse delete", res)
    });
    this._service.retrieveAllBike((res) => {
      console.log("from browse com: ", res)
      this.bikes = res;
    });
  }

  searchItem() {
    if(this.search == "") {
      this._service.retrieveAllBike((res) => {
        this.bikes = res;
      })
    }
    else {
      this._service.searchItem(this.search, (res) => {
        this.bikes = res;
      })
    }
  }

  logout() {
    this._service.logout();
    this._router.navigate(['/'])
  }

}
