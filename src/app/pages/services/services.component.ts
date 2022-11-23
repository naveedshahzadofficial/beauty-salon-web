import { ICategory } from './../../interfaces/category.interface';
import { PageService } from './../../services/page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  categories: ICategory[] = [];

  constructor(private pageService:PageService) { }

  ngOnInit(): void {
    this.pageService.homePage().subscribe((resp:any) =>{
      this.categories = resp.categories;
    });
  }

}
