import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '@interfaces/category.interface';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.scss'],
})
export class ServiceCardsComponent implements OnInit {
  @Input() categories: ICategory[] = [];

  constructor() {}

  ngOnInit(): void {}
}
