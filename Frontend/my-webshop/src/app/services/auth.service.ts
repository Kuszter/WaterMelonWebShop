import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserRegistration } from '../models/user-registration.model';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { UserLoginModel } from '../models/user-login.model';
import { CartService } from './cart.service';
import { CartItem } from '../models/carItem.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5043/api';
  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient, private cartService: CartService) {
    this.checkToken();
  }
  getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);

    }
    
    return headers;
  }
  register(userRegistration: UserRegistration): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/User/Register`, userRegistration).pipe(
      tap((token: string) => {
        this.setToken(token);
      })
    );
  }

  login(userLogin: UserLoginModel): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/User/Login`, userLogin, { responseType: 'text' as 'json' }).pipe(
      tap((token: string) => {
        this.setToken(token);
        this.getUserFromToken(token).then((user) => {
          this.user.next(user);
          this.updateCartItems(token);
        });
      })
    );
  }

  async checkToken() {
    const token = localStorage.getItem('token');
  
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.sub;
      const userName = decodedToken.UserName;
      const isAdmin = decodedToken.isAdmin;
      const email = decodedToken.email;
      const firstName = decodedToken.firstName;
  
      if (!userId) {
        return;
      }
  
      const user: User = {
        id: userId,
        userName: userName,
        isAdmin: isAdmin,  
        email: email,
        firstName: firstName,
        passwordHash:"",
        lastName:"",
        provider:'',
        providerUserId:''
      };
  
      this.user.next(user);
    }
  }
  

  logout() {
    localStorage.removeItem('token');
    this.user.next(null);
    this.cartService.clearCart();
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
  
    return !!token;
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.isAdmin.toLowerCase() === 'true';  
    }
    return false;
  }
  
  async getUserFromToken(token: string): Promise<User | null> {
    try {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.sub;
      const userName = decodedToken.UserName;
      const isAdmin = decodedToken.isAdmin === true;
      const email = decodedToken.Email;
      const firstName = decodedToken.FirstName;
      const lastName = decodedToken.LastName;
      const provider = decodedToken.Provider;
      const providerUserId = decodedToken.ProviderUserId;
  
      if (!userId) {
        return null;
      }
  
      const user: User = {
        id: userId,
        userName: userName,
        isAdmin: isAdmin,
        email: email,
        firstName: firstName,
        lastName: lastName || null,
        passwordHash: null || '',
        provider: provider || null,
        providerUserId: providerUserId || null
      };
  
      return user;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private updateCartItems(token: string) {
    const decodedToken: any = jwt_decode(token);
    const userId = decodedToken.sub;
    const cartItems = this.cartService.getItems();
    const encodedCartItems = JSON.stringify(cartItems);
    localStorage.setItem(`cartItems_${userId}`, encodedCartItems);
  }

  private getCartItems(token: string): CartItem[] | null {
    const decodedToken: any = jwt_decode(token);
    const userId = decodedToken.sub;
    const encodedCartItems = localStorage.getItem(`cartItems_${userId}`);
    if (encodedCartItems) {
      return JSON.parse(encodedCartItems);
    }
    return null;
  }
  
}
