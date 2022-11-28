import { ILinks } from './../../interfaces/links.interface';
import { IMeta } from './../../interfaces/meta.interface';
import { PageService } from './../../services/page.service';
import { IStory } from './../../interfaces/story.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  stories: IStory[] = [];
  page: number = 1;
  per_page: number = 10;
  meta!: IMeta;
  links!: ILinks;

  constructor(private pageService: PageService) {}

  ngOnInit(): void {
    this.getStories();
  }

  getStories() {
    this.pageService
      .storiesPage(this.per_page, this.page)
      .subscribe((resp: any) => {
        console.log(resp);
        this.stories = resp.data;
        this.links = resp.links;
        this.meta = resp.meta;
        this.meta.links = this.meta.links.map((link) => {
          if (link.label === '&laquo; Previous') {
            link.label = '«';
          } else if (link.label === 'Next &raquo;') {
            link.label = '»';
          }
          if (link.url) {
            let url = new URL(link.url);
            let page = url.searchParams.get('page');
            link.url = page?.toString();
          }
          return link;
        });
      });
  }

  pageChange(page: string) {
    this.page = parseInt(page);
    this.getStories();
  }
  scroll(el: HTMLElement) {
    console.log(el);
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
