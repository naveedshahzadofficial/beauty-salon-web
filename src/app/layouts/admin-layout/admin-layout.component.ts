import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  isLogin!: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isStaffLoggedIn$.subscribe(resp => this.isLogin = resp);
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

}
