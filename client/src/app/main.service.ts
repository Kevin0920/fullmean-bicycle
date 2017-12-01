import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class MainService {
  user;
 
  constructor(private _http: Http) {
    if(localStorage.user != undefined) {
      this.user = JSON.parse(localStorage.user);
    }
   }
  
  register(user, callback) {
    console.log("from regi service: ", user);
    this._http.post("/register", user).subscribe(
      (res) => {
        console.log("from service register: ", res.json());
        callback(res.json());
        if(res.json().success == "success") {
          this.user = res.json().user;
          localStorage.user = JSON.stringify(res.json().user);
          
        }
    }, 
      (err) => {
        console.log(err);
    })
  }

  login(data, callback) {
    this._http.post("/login", data).subscribe(
      (res) => {
        callback(res.json());
        this.user = res.json();
        console.log(this.user);
        if(res.json().error == undefined){
          this.user = res.json();
          console.log(this.user);
          localStorage.user = JSON.stringify(res.json());

        }
      }, 
      (err) => {
        console.log("error from login service: ", err);
      })
  }

  findCreater(id, callback) {
    this._http.get("/bikes/" + id + "/user").subscribe(
      (res) => {
        callback(res.json());
      })
  }

  createBike(data, callback) {
    
    console.log("create bike from service");
    this._http.post("/user/"+ this.user._id + "/bike", data).subscribe(

      (res) => {
        console.log("create bike success from service");
        console.log("from service createBike: ", res);
        callback(res);
      },
      (err) => {
        console.log("from service createBike: ", err);
      })
  }

  retrieveAllBike(callback) {
    this._http.get("/bikes").subscribe(
      (res) => {
        callback(res.json());
      })
  }

  searchItem(data, callback) {
    this._http.post("/bikes/search", {data: data}).subscribe(
      (res) => {
        console.log("from service searchitem: ", res);
        callback(res.json());
    }, 
      (err) => {
        console.log("from service searchitem error: ", err);
    })
  }

  retrMyBikes(callback) {
    this._http.get("/user/" + this.user._id + "/bike").subscribe(
      (res) => {
        console.log(res.json());
        callback(res.json());
      })
  }

  update(id, data, callback) {
    console.log("from service update: ", data);
    this._http.put("/bikes/" + id, data).subscribe(
      (res) => {
        callback(res.json());
      },
      (err) => {
        console.log("error from service update: ", err);
      })
  }
 
  deleteBike(id, callback) {
    console.log("delete mothod");
    this._http.delete("/bikes/" + id).subscribe(
      (res) => {
        callback(res.json());
      }, 
      (err) => {
        console.log(err);
      })
  }

  logout() {
    localStorage.removeItem("user")
  }



}
