import { Component } from '@angular/core';
import { SpinnerService } from './shared/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NY-Times-Top-Stories';
  public isRequesting = false;
  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.requestInProcess$.subscribe(isDone => {
      this.isRequesting = isDone;
    });
  }
}
