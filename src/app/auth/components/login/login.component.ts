import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseAPIService } from 'src/app/services/base.service';
import { GLOBAL } from 'src/app/shared/global';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  submitted: boolean = false;
  constructor(private apiService: BaseAPIService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(GLOBAL.email_pattern)]],
      password: ['', [Validators.required]],
    });
  }

  get uf() { return this.userForm.controls; }

  /**
* Takes two fields and returns access_token
* @param email first input user email
* @param password second input to password
* @returns access_token of of user
*/
  login() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.apiService.post(`${environment.authURL}login`, this.userForm.value).subscribe((res: any) => {
        if (res && res?.access_token) {
          localStorage.setItem('access_token', JSON.stringify(res?.access_token));
          this.router.navigate(['top-stories']);
        }
      })
    }
  }

}
