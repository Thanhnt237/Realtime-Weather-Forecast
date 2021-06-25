import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChangeAvatarService {

  private _changeAvatarUrl = "http://localhost:8080/api/change-avatar";

  constructor(
  private http: HttpClient
  ) { }

  ChangeAvatar(avatar: any){
    return this.http.post<any>(this._changeAvatarUrl, avatar);
  }

}
