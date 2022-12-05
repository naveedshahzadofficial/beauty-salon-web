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
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout(e: Event): void {
    e.preventDefault();
    this.authService.logout().subscribe(() => {
      this.authService.removeToken();
      this.isOpen = false;
      this.router.navigate(['client/login']);
    });
  }
}
