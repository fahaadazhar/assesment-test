import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseAPIService } from 'src/app/services/base.service';
import { SharedService } from 'src/app/services/shared-service';
import { GLOBAL } from 'src/app/shared/global';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  top_stories: any;
  page = 1;
  records = 10;
  category = 'home';
  searchBy = '';
  constructor(private apiService: BaseAPIService,
    private sharedService: SharedService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getlists();
  }

  getlists() {
    this.apiService.get(`${environment.stories}topstories/v2/${this.category}.json?api-key=${environment.key}`).subscribe((res: any) => {
      if (res && res?.num_results > 0) {
        this.top_stories = res?.results;
        console.log(this.top_stories);
      }
    });
  }

  details(story: any) {
    this.sharedService.setStory(story);
    this.router.navigate([`top-stories/details/${story?.title}`]);
  }

  pageChanged(event: number) {
    this.page = event;
    GLOBAL.scrollToTop();
  }
}
