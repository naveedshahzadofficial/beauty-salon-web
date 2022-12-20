import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit {
  isLogin!: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isStaffLoggedIn$.subscribe(resp => this.isLogin = resp);
  }

}
