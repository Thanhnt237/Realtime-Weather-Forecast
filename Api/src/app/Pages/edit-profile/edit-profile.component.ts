import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EditProfileService } from "../../Services/edit-profile.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

    alertError: boolean = false;
    errCatching = '';

    editUserProfile = {
      'userId': '',
      'name': '',
      'password': '',
      'phone': ''
    };

    hide: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _editProfileService: EditProfileService
    ) { }

    ngOnInit(): void {
    }

    editProfileForm: FormGroup = this._formBuilder.group({
        name : new FormControl('', [Validators.required]),
        userId : new FormControl('', [Validators.required]),
        phone : new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      });

      onEditProfile() {
        if (!this.editProfileForm.valid) {
          return;
        }
        this.EditProfile();
      }

      EditProfile(){
        if(this.editProfileForm.value.password !== this.editProfileForm.value.confirmPassword){
          this.alertError = true;
          this.errCatching = "Passwords don't match";
        }else{
          this.editUserProfile = this.editProfileForm.value;
          this._editProfileService.EditProfile(this.editUserProfile)
          .subscribe(
            res => {
              console.log(res);
              this._router.navigate(['/profile']);
            },
            err => {
              console.log(err);
              this.alertError = true;
              this.errCatching = err.error;
              console.log(this.errCatching);
            }
          )
        }

      }
}
