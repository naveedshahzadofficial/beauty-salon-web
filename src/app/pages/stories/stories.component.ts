import { ILinks } from './../../interfaces/links.interface';
import { IMeta } from './../../interfaces/meta.interface';
import { PageService } from './../../services/page.service';
import { IStory } from './../../interfaces/story.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  stories: IStory[] = [];
  page: number = 1;
  per_page: number = 10;
  meta!: IMeta;
  links!: ILinks;

  constructor(private pageService:PageService) { }

  ngOnInit(): void {
    this.getStories();
  }

  getStories(){
    this.pageService.storiesPage(this.per_page, this.page).subscribe((resp:any) =>{
      console.log(resp);
      this.stories = resp.data;
      this.links = resp.links;
      this.meta = resp.meta;
    });
  }

  pageChange(){
    console.log('page has been changed.');
  }


}
