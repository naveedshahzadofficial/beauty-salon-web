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

}
