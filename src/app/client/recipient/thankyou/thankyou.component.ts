import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  @Input() order_number!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
