import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products :any= [];

  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product: any, quantity: number): void {
    this.cartService.addToCart(product, quantity);
  }
  
  
}
