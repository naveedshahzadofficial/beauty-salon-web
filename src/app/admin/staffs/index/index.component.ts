import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class StaffIndexComponent implements OnInit {
  message: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
