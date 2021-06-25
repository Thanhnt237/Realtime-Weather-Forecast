import { Component, OnInit } from '@angular/core';
import { ChangeAvatarService } from "../../Services/change-avatar.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {

    constructor(
      private _changeAvatarService: ChangeAvatarService,
      private _router: Router
    ) { }

    ngOnInit(): void {
    }

    ChangeAvatar(event: any){
      const avatar = event.target.files[0];
      console.log(avatar);

      const formdata = new FormData();
      formdata.append('avatar', avatar)

      this._changeAvatarService.ChangeAvatar(formdata)
        .subscribe(
          res => {
            console.log(res);
            this._router.navigate(['/profile']);
          },
          err => console.log(err)
        )
    }
}
