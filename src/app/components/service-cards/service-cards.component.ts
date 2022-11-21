import { IResponses } from './../../interfaces/responses.interface';
import { ICategory } from './../../interfaces/category.interface';
import { CategoryService } from './../../services/category.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.scss']
})
export class ServiceCardsComponent implements OnInit {
  @Input() categories: ICategory[] = [];

  constructor() {}

  ngOnInit(): void {}

}
