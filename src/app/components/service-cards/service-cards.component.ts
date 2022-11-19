import { ICategory } from './../../interfaces/category.interface';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.scss']
})
export class ServiceCardsComponent implements OnInit {
  categories!: ICategory[];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((response:ICategory[]) => {
      this.categories = response;
      console.log(response);
    });
  }

}
