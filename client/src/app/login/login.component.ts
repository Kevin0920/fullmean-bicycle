import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_login = {
    email: "",
    password: ""
  }

  bike:any;
  password_confirm = {
    con: ""
  };
  user_reg = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  }

  err_message = {
    email: "",
    login: ""
  }
  constructor(private _service: MainService, private _router: Router) { }

  register() {
    this._service.register(this.user_reg, (res) => {
      console.log("from com register: ", this.user_reg);
      if(res.success === "success") {
        this._router.navigate(['/browse']);
      }
      else {
        this.err_message.email = "This email has been registered."
      }
      this.user_reg = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      };
      this.password_confirm = {
        con: ""
      };
    });

  }

  login() {
    this._service.login(this.user_login,
      (res) => {
        if(res.error == undefined) {
          this._router.navigate(['/browse']);
        }
        else {
          this.err_message.login = res.error;
        }
      });
    this.user_login = {
      email: "",
      password: ""
    };
  }

  ngOnInit() {
    this._service.retrieveAllBike(
      (res) => {
        console.log(res);
        var index = Math.floor(Math.random() * res.length);
        this.bike = res[index];
        console.log(this.bike);
      })
  }

}
