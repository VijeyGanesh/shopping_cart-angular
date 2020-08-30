import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { Product } from 'src/app/models/product';
import { CartItem} from 'src/app/models/cart-item'
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [
  ];

  cartTotal = 0;

  constructor(private message : MessengerService , private cartService : CartService) { }

  ngOnInit(): void {
    this.handleSubscription();
    this.loadCartItems();
  }

  handleSubscription() {
    this.message.getMsg().subscribe((product : Product) => {
      this.loadCartItems();
  })
  }

  loadCartItems(){
    this.cartService.getCartItems().subscribe((items : CartItem[] ) => {
      this.cartItems = items;
      this.calculateCartTotal();
    })
  }

    calculateCartTotal() {
    this.cartTotal=0;
  this.cartItems.forEach(item => { this.cartTotal +=  item.qty * item.price });
    }
  }