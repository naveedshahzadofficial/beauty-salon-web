import { IReviewSlider } from './../../interfaces/review-slider.interface';
import { ISlider } from './../../interfaces/slider.interface';
import { ICategory } from './../../interfaces/category.interface';
import { PageService } from './../../services/page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories!: ICategory[];
  sliders!: ISlider[];
  review_sliders!: IReviewSlider[];

  constructor(private pageService:PageService) { }

  ngOnInit(): void {
    this.pageService.homePage().subscribe((resp:any) =>{
      this.categories = resp.categories;
      this.sliders = resp.sliders;
      this.review_sliders = resp.review_sliders;
    });
  }

  help_cards = [
    {
      "title":"Download & Install",
      "image_file":"assets/images/how-use-app-1.png",
    },{
      "title":"Book Online",
      "image_file":"assets/images/how-use-app-2.jpg",
    },{
      "title":"Rate Our Services",
      "image_file":"assets/images/how-use-app-3.jpg",
    }
  ];

  stories = [
    {
      "title":"How to Use Setting Spray for Long-lasting Makeup",
      "image_file":"assets/images/stories/1.jpg",
      "stories_categories":"Makeup & Hair, Tips and Myths"
    },{
      "title":"Hair Dye Allergy - Symptoms and Home Remedies",
      "image_file":"assets/images/stories/2.jpg",
      "stories_categories":"Makeup & Hair, Tips and Myths"
    },{
      "title":"Benefits of Humidifiers for Skin in Winter",
      "image_file":"assets/images/stories/3.jpg",
      "stories_categories":"Makeup & Hair, Tips and Myths"
    }
  ];

  features = [
    {
      "title":"How Pakistan can diversify, digitally",
      "link":"http://blogs.worldbank.org/psd/how-pakistan-can-diversify-digitally",
      "image_file":"assets/images/features/world-bank-logo.svg"
    },
    {
      "title":"Tevta",
      "link":null,
      "image_file":"assets/images/features/tevta_logo.png"
    },
    {
      "title":"BBC News",
      "link":null,
      "image_file":"assets/images/features/bbc-news.png"
    },
    {
      "title":"ARY News",
      "link":null,
      "image_file":"assets/images/features/ary-news.png"
    },
    {
      "title":"ProPakistani",
      "link":null,
      "image_file":"assets/images/features/pro-pakistani.png"
    },
  ]

}
