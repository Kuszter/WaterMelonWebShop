import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserLoginModel } from '../models/user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  login(): void {
    if (this.loginForm.valid) {
        const userLogin: UserLoginModel = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
        };

        this.authService.login(userLogin).subscribe(
            () => {
                console.log("Successful login");
                this.router.navigate(['/']);
            },
            error => {
                console.log("Failed login");
                console.log(`Error: ${error.status} - ${error.message}`);
                alert("Invalid username or password");
            }
        );
    } else {
        console.log("Please provide the username and password.");
        alert("Please provide the username and password.");
    }
}

  

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}

