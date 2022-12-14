import { Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, AfterViewInit {
  isActiveDropdown: boolean = false;
  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.dropdown.nativeElement, 'click').subscribe(resp => {
      this.isActiveDropdown = !this.isActiveDropdown;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.removeToken();
      this.isActiveDropdown = false;
      this.router.navigate(['admin/login']);
    })
  }

}
