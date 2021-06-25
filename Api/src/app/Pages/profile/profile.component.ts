import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { ProfileService } from "../../Services/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userProfile = {
    userId: String,
    name: String,
    email:String,
    password: String,
    phone: String,
    avatar: String
  };

  constructor(
    private _profileService: ProfileService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._profileService.getUserProfile()
      .subscribe(
        res => {
          this.userProfile = res;
          console.log(res);
        },
        err => console.log(err)
    )
  }
}
