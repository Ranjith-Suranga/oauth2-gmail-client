import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem('access_token');
    const newReq = req.clone({
      headers: new HttpHeaders('Authorization:Bearer ' + accessToken)
    });
    return next.handle(newReq).pipe(catchError(err => {
      // If the token is invalid or expired
      if (err.status === 401) {
        window.location.replace('https://accounts.google.com/o/oauth2/v2/auth?client_id=503256322307-h16k5r5p4otjul26l7sm4lhm2et5488v.apps.googleusercontent.com&response_type=token&scope=https://www.googleapis.com/auth/gmail.readonly&state=suraboy&redirect_uri=' + environment.redirectUrl);
      }
      throw (err);
    }));
  }

}
