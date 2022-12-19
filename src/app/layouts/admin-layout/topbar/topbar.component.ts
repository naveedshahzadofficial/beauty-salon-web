import { DomEvents } from '@common/dom.events';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, AfterViewInit {
  isActiveDropdown: boolean = false;
  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.dropdown.nativeElement, 'click').subscribe(resp => {
      this.isActiveDropdown = !this.isActiveDropdown;
    })
  }

}
