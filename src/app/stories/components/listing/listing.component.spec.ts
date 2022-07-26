import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { BaseAPIService } from 'src/app/services/base.service';
import { SharedService } from 'src/app/services/shared-service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from '../navbar/navbar.component';

import { ListingComponent } from './listing.component';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ListingComponent, NavbarComponent],
      providers: [
        BaseAPIService,
        SpinnerService,
        SharedService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch listing from Top Stories API', () => {
    let app = fixture.componentInstance;
    let apiService = fixture.debugElement.injector.get(BaseAPIService);
    let query = 'home';
    let records: any;
    apiService.get(`${environment.stories}topstories/v2/${query}.json?api-key=${environment.key}`).subscribe((res: any) => {
      records = res?.response?.docs;
    });
    app.getlists();
    expect(app.top_stories).toEqual(records);
  });

  it('should fetch record of category Top Stories API', () => {
    let app = fixture.componentInstance;
    let apiService = fixture.debugElement.injector.get(BaseAPIService);
    let query = 'art';
    let records: any;
    apiService.get(`${environment.stories}topstories/v2/${query}.json?api-key=${environment.key}`).subscribe((res: any) => {
      records = res?.response?.docs;
    });
    app.getlists();
    expect(app.top_stories).toEqual(records);
  });
});
