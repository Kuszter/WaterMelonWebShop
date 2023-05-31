import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolverService implements Resolve<boolean> {

  constructor(private authService: AuthService) { }

  resolve(): Observable<boolean> {
    const isLoggedIn = this.authService.isLoggedIn();
    return of(isLoggedIn);
  }
}
