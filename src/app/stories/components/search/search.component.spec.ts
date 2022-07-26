import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { BaseAPIService } from 'src/app/services/base.service';
import { SharedService } from 'src/app/services/shared-service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { environment } from 'src/environments/environment';
import { servicesVersion } from 'typescript';
import { of } from 'rxjs';

import { SearchComponent } from './search.component';
import { AppComponent } from 'src/app/app.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule
      ],
      declarations: [SearchComponent],
      providers: [
        BaseAPIService,
        SpinnerService,
        SharedService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search query from API', () => {
    let app = fixture.componentInstance;
    let apiService = fixture.debugElement.injector.get(BaseAPIService);
    let query = 'elections';
    let records: any;
    apiService.get(`${environment.stories}search/v2/articlesearch.json?q=${query}&api-key=${environment.key}`).subscribe((res: any) => {
      records = res?.response?.docs;
    });
    app.search();
    expect(app.search_stories).toEqual(records);
  });
});
