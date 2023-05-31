import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.username = user?.userName || '';
      this.isAdmin = this.authService.isAdmin(); 
      console.log(this.isAdmin + ':admin')
    });
  }
  
  
 
  

  logout(): void {
    this.authService.logout();
  }
}
