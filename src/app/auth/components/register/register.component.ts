import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseAPIService } from 'src/app/services/base.service';
import { GLOBAL } from 'src/app/shared/global';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  submitted: boolean = false;
  constructor(private apiService: BaseAPIService,
    private formBuilder: FormBuilder,) {

  }

  ngOnInit(): void {
    // this.getlists();
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(GLOBAL.email_pattern)]],
      password: ['', [Validators.required]],
    });
  }

  get uf() { return this.userForm.controls; }

  getlists() {
    this.apiService.get(`${environment.stories}topstories/v2/arts.json?api-key=${environment.key}`).subscribe((res: any) => {
      if (res) {
        console.log(res);
      }
    });
  }

  register() {
    this.submitted = true;
    if(this.userForm.valid) {
      this.apiService.post(`${environment.authURL}register` , this.userForm.value).subscribe((res: any) => {
        console.log(res);
        if(res && res?.access_token) {
          // JSON.stringify(localStorage.setItem('access_token', res?.access_token));
        }
      })
    }
  }

}
