import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
