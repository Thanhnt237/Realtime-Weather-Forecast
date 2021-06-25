import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _profileUrl = "http://localhost:8080/api/profile";

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  getUserProfile(){
    return this.http.get<any>(this._profileUrl);
  }
}
