import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  showSuccessMessage: boolean = false;
  cartSuccessMessage: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  increaseQuantity(productId: string) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: string) {
    this.cartService.decreaseQuantity(productId);
  }

  submitOrder() {
    
    this.showSuccessMessage = true;
    this.cartSuccessMessage = 'Order has been successfully submitted!';


    this.cartService.clearCart();
    this.cartItems = this.cartService.getItems();
  }

  getTotalSum(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
  
}
