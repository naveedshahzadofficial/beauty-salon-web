import { IStory } from './../../interfaces/story.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-story-cards',
  templateUrl: './story-cards.component.html',
  styleUrls: ['./story-cards.component.scss']
})
export class StoryCardsComponent implements OnInit {
  @Input() stories: IStory[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
