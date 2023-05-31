import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginModel } from './models/user-login.model';
import { UserRegistration } from './models/user-registration.model';
import { AuthService } from './services/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApiUrl: string = 'http://localhost:5043/api/';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getProducts(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.httpClient.get<any[]>(`${this.baseApiUrl}product`, { headers });
  }
  
  getProductById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseApiUrl}product/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  createProduct(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.httpClient.post<any>(`${this.baseApiUrl}product`, product, { headers: headers });


}

  
  updateProduct(id: string, product: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseApiUrl}product/${id}`, product, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  deleteProduct(id: string): Observable<any> {
    console.log('Deleting product with id:', id);
    return this.httpClient.delete<any>(`${this.baseApiUrl}product/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
}


  
  getCategories(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.httpClient.get<any[]>(`${this.baseApiUrl}categories`, { headers });
  }
  
  getCategoryByID(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseApiUrl}categories/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  login(user: UserLoginModel): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApiUrl}user/login`, user, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'text' as 'json'
    });
  }
  
  register(user: UserRegistration): Observable<string> {
    return this.httpClient.post<string>(`${this.baseApiUrl}user/register`, user, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
