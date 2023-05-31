import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

import { ApiService } from '../api.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  showSuccessMessage = false; // Új változó az üzenet megjelenítéséhez
  cartSuccessMessage = ''; // Üzenet a sikeres kosárba helyezéshez
  constructor(private apiService: ApiService, private route: ActivatedRoute, private cartService: CartService) { 
}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
  
    if (productId) {
      this.apiService.getProductById(productId).subscribe(
        product => {
          this.product = product;
          this.product.quantity = 1; 
        },
        error => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }
  
  

  addToCart(product: any): void {
    const productToAdd = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: product.quantity, // Itt használd a termék quantity tulajdonságát
    };
    this.cartService.addToCart(productToAdd);
    this.cartSuccessMessage = `The product '${product.name}' has been successfully added to the cart (${product.quantity} pcs).`;
    this.showSuccessMessage = true;
  
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 5000);
  }
  
  
}

  
  

