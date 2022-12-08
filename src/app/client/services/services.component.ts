import { Component, OnInit } from '@angular/core';
import { ClientService } from '@services/client.service';
import { IService } from '@interfaces/service.interface';
import { ICategory } from '@interfaces/category.interface';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  categories: ICategory[] = [];
  services: IService[] = [];
  tab_activated!: number;
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
      if (this.categories.length) {
        let category = this.categories[0];
        this.getCategoryServices(category);
      }
    });
  }

  getCategoryServices(category: ICategory) {
    this.tab_activated = category.id;
    this.clientService
      .getCategoryServices(category.id)
      .subscribe((resp) => (this.services = resp));
  }



  // onCheckboxChange(e: any) {
  //   if (e.target.checked) {
  //     this.checkedItems.push(e.target.value);
  //   } else {
  //     this.checkedItems = this.checkedItems.filter(
  //       (item: any) => item !== e.target.value
  //     );
  //   }

  //   console.log(this.checkedItems);
  // }

 
}
