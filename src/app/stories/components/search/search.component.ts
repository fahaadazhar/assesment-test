import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseAPIService } from 'src/app/services/base.service';
import { SharedService } from 'src/app/services/shared-service';
import { GLOBAL } from 'src/app/shared/global';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search_stories: any;
  page = 1;
  records = 10;
  category = 'home';
  searchBy = '';
  history: any = [];
  constructor(private apiService: BaseAPIService,
    private sharedService: SharedService,
    private router: Router) {
    this.sharedService.selectedHistory$.subscribe((value) => {
      if (value && value?.length > 0) this.history = value;
    });
  }

  ngOnInit(): void {
  }

  pageChanged(event: number) {
    this.page = event;
    GLOBAL.scrollToTop();
  }

  search() {
    if (this.history.length > 5) this.history.pop();
    if (!this.history.some((x: any) => x.includes(this.searchBy))) this.history.unshift(this.searchBy);
    this.sharedService.setSearchHistory(this.history);
    this.apiService.get(`${environment.stories}search/v2/articlesearch.json?q=${this.searchBy}&api-key=${environment.key}`).subscribe((res: any) => {
      if (res && res?.response && res?.response?.docs?.length > 0) {
        this.search_stories = res?.response?.docs;
      }
    });
  }

  searchFromHistory(word: string) {
    this.searchBy = word;
    this.search();
  }
}