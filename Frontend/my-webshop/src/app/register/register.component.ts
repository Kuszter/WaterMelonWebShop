import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistration } from '../models/user-registration.model';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, 
    private socialAuthService: SocialAuthService,
    private router: Router, private formBuilder: FormBuilder,
    private apiService: ApiService,
    ) {
    this.registerForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).+$/)]],
      passwordConfirm: ['', Validators.required],
    }, { validator: this.passwordsMatch });
  }
  
  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { 'passwordsMismatch': true };
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
  
    const userName = this.registerForm.get('userName')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const passwordConfirm = this.registerForm.get('passwordConfirm')?.value;
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
  
    const userRegistration: UserRegistration = {
      user: {
        userName, 
        email, 
        passwordHash: password,
        firstName, 
        lastName,
        isAdmin: false,
        provider: '',
        providerUserId: ''
      },
      password,
      passwordConfirm,
      provider: '',
      providerUserId: ''
    };
  
    this.authService.register(userRegistration).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        console.error('Regisztrációs hiba:', error);
        alert("Regisztrációs hiba");
      }
    );
    
  }
  
  
  registerWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((socialUser: SocialUser) => {
      const userRegistration: UserRegistration = {
        user: {
          id: "random_generated_id",
          userName: socialUser.name,
          email: socialUser.email,
          passwordHash: '', 
          firstName: "firstName",
          lastName: "lastName",
          isAdmin: false,
          provider: GoogleLoginProvider.PROVIDER_ID,
          providerUserId: socialUser.id
        },
        password: '',
        passwordConfirm: '',
        provider: GoogleLoginProvider.PROVIDER_ID,
        providerUserId: socialUser.id
      };
  
      this.apiService.register(userRegistration).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          console.error('Google Registration Error:', error);
          alert("Google Registration Error");
        }
      );
    }).catch((error) => {
      console.error('Google signIn Error:', error);
      alert("Google Sign-In Error");
    });
  }
  
  registerWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((socialUser: SocialUser) => {
      const userRegistration: UserRegistration = {
        user: {
          id: "random_generated_id",
          userName: socialUser.name,
          email: socialUser.email,
          passwordHash: '', 
          firstName: "firstName",
          lastName: "lastName",
          isAdmin: false,
          provider: FacebookLoginProvider.PROVIDER_ID,
          providerUserId: socialUser.id
        },
        password: '',
        passwordConfirm: '',
        provider: FacebookLoginProvider.PROVIDER_ID,
        providerUserId: socialUser.id
      };
  
      this.apiService.register(userRegistration).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          console.error('Facebook Registration Error:', error);
          alert("Facebook Registration Error");
        }
      );
    }).catch((error) => {
      console.error('Facebook signIn Error:', error);
      alert("Facebook Sign-In Error");
    });
  }
  
}