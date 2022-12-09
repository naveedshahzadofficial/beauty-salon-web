import { Component, OnInit } from '@angular/core';
import { ClientService } from '@services/client.service';
import { IService } from '@interfaces/service.interface';
import { ICategory } from '@interfaces/category.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  services: IService[] = [];
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let slug = params.get('slug') || '';
      this.getCategoryServices(slug);
    });
  }

  getCategoryServices(slug: string) {
    this.clientService
      .getCategoryServices(slug)
      .subscribe((resp) => (this.services = resp));
  }
}
