import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any;
  password: any;
  valid: boolean = false;

  constructor(public fbobj: FormBuilder, private authService: AuthService) { }

  MarvellousForm = this.fbobj.group({
    Name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    Password: new FormControl('', [Validators.required]),
  });

  login() {
    this.authService.login(this.username, this.password);
  }

}
