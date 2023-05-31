import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topCategories: any[] = [];
  topProducts: any[] = [];

  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    // Assuming Categories and Products are arrays
    this.apiService.getCategories().subscribe((categories: any[]) => {
      this.topCategories = categories.slice(0, 3);
    });

    this.apiService.getProducts().subscribe((products: any[]) => {
      this.topProducts = products.slice(0, 3);
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product, product.quantity);
  }
  
}
