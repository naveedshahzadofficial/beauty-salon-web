import { ICartItem } from '@interfaces/cart-item.interface';
import { CartService } from '@services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ICartAddon } from '@interfaces/cart-addon.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cartItems: ICartItem[] = [];
  public grandTotal: number = 0;
  public totalCartItems: number = 0;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.totalCartItems = cartItems.length;
      this.grandTotal = this.cartService.getTotalPrice();
      this.cartItems = cartItems;
    });
  }

  removeFromCart(cartItem: ICartItem) {
    this.cartService.removeFromCart(cartItem);
  }

  removeAddonFromCart(CartAddonItem: ICartAddon, cartItem: ICartItem) {
    this.cartService.removeAddonFromCart(cartItem, CartAddonItem);
  }

  changedItemQtyEvent(cartItem: ICartItem) {
    this.cartService.changedItemQtyEvent(cartItem);
  }
  clearAllCart() {
    this.cartService.clearCart();
  }

  checkout(e: any) {
    e.preventDefault();
    if (this.grandTotal < 1500) {
      alert('Place your minimum order of Rs. 1500');
    } else {
      this.router.navigate(['checkout'], {
        relativeTo: this.route,
      });
    }
  }
}
