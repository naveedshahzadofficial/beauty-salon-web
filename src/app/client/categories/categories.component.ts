import { Component, OnInit } from '@angular/core';
import { ClientService } from '@services/client.service';
import { ICategory } from '@interfaces/category.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientService.getCategories().subscribe((resp) => {
      this.categories = resp;
      if (this.categories.length) {
        this.router.navigate(['services', this.categories[0].category_slug], {
          relativeTo: this.route,
        });
      }
    });
  }
}
