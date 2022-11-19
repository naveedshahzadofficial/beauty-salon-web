import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.scss']
})
export class ServiceCardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  categories = [
    {},{},{},{},{},{},{},{},{},
  ]

}
