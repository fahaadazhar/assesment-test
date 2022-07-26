import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse
} from "@angular/common/http";

import { tap, catchError } from "rxjs/operators";
import { SpinnerService } from "../shared/spinner/spinner.service";
import { AuthGuard } from "./auth.guard";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.spinnerService.requestInProcess(true);

    const url = ['login', 'register'];
    if (url.some(x => x.includes(request.url))) {
      request = request.clone({
        setHeaders: {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${AuthGuard.getToken()}`,
          Accept: "application/json",
        }
      });
    }
    return next.handle(request).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.decreaseRequests();
        }
      }),
      catchError(err => {
        this.decreaseRequests();
        alert('Server Error!');
        throw err;
      })
    );
  }
  private decreaseRequests() {
    this.spinnerService.requestInProcess(false);
  }
}
