import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '@services/page.service';
import { ICategory } from '@interfaces/category.interface';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent implements OnInit {
  category!: ICategory;
  constructor(
    private route: ActivatedRoute,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('slug'));
    });
  }

  description =
    '<p> It is not just a massage service but the perfect therapy you need to rejuvenate and recoup for going about your daily routine. GharPar full body massage is your power house! Let us help you achieve your life goals hassle-free.</p>';
}
