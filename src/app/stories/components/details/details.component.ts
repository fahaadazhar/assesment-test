import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared-service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  story: any;
  constructor(private sharedService: SharedService) {
    this.sharedService.selectedStory$.subscribe((value) => {
      if (value) this.story = value;
    });
  }

  ngOnInit(): void {
  }

}
