import { ICategory } from '@interfaces/category.interface';
import { ClientService } from '@services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  categories: ICategory[] = [];
  tab_activated!: number;
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService
      .getCategories()
      .subscribe((resp: any) => (this.categories = resp));
  }

  getCategoryServices(category: ICategory) {
    this.tab_activated = category.id;
    console.log(category);
  }
}
