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
  constructor(private pageService:PageService) { }

  ngOnInit(): void {
    this.getStories();
  }

  getStories(){
    this.pageService.storiesPage(this.per_page).subscribe((resp:any) =>{
      console.log(resp);
      this.stories = resp.data;
    });
  }

  onTableDataChanged(event: any){
    console.log(event)
    this.getStories();
  }

  onTableSizeChanged(event: any){
    console.log(event.target.value);
    this.page = 1;
    this.getStories();
  }

}
