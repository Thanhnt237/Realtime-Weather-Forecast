import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

    private _editProfileUrl = "http://localhost:8080/api/edit-profile";
    private _getEditProfileUrl = "http://localhost:8080/api/profile";

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  EditProfile(user: any){
    return this.http.post<any>(this._editProfileUrl, user);
  }

  getEditProfile(){
    return this.http.get<any>(this._getEditProfileUrl);
  }
}
