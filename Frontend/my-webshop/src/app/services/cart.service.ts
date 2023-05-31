import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { CartItem } from '../models/carItem.model';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.items);
  public items$ = this.itemsSubject.asObservable();

  constructor() {
    this.loadCartItems();
  }

  getItems(): CartItem[] {
    return this.items;
  }
  increaseQuantity(productId: string) {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity += 1;
      this.saveCartItems();
      this.itemsSubject.next(this.items);
    }
  }

  decreaseQuantity(productId: string) {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = item.quantity > 1 ? item.quantity - 1 : 1;
      this.saveCartItems();
      this.itemsSubject.next(this.items);
    }
  }

  addToCart(product: Product, quantity = 1) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const item: CartItem = {
        product,
        quantity
      };
      this.items.push(item);
    }
    this.saveCartItems();
    this.itemsSubject.next(this.items);
  }
  

  removeFromCart(productId: string) {
    const index = this.items.findIndex(item => item.product.id === productId);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCartItems();
      this.itemsSubject.next(this.items);
    }
  }

  clearCart() {
    this.items = [];
    this.saveCartItems();
    this.itemsSubject.next(this.items);
  }

  private loadCartItems() {
    const token = localStorage.getItem('token');
    if (token) {
      const cartItems = this.getCartItemsFromToken(token);
      if (cartItems) {
        this.items = cartItems;
      }
    }
  }

  private saveCartItems() {
    const token = localStorage.getItem('token');
    if (token) {
      const encodedCartItems = JSON.stringify(this.items);
      localStorage.setItem(`cartItems_${token}`, encodedCartItems);
    }
  }

  private getCartItemsFromToken(token: string): CartItem[] | null {
    const encodedCartItems = localStorage.getItem(`cartItems_${token}`);
    if (encodedCartItems) {
      return JSON.parse(encodedCartItems);
    }
    return null;
  }
}
