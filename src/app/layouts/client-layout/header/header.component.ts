import { CartService } from './../../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  totalCartItems: number = 0;
  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService
      .getCartItems()
      .subscribe((cartItems) => (this.totalCartItems = cartItems.length));
  }

  logout(e: Event): void {
    e.preventDefault();
    this.authService.logout().subscribe(() => {
      this.authService.removeToken();
      this.isOpen = false;
      this.router.navigate(['client/login']);
    });
  }
}
