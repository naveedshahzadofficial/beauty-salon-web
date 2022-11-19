import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.scss']
})
export class ServiceCardsComponent implements OnInit {
  categories!: any[];
  constructor(private categoryService: CategoryService) {
    categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
      console.log(response);
    });
   }

  ngOnInit(): void {
  }

}
