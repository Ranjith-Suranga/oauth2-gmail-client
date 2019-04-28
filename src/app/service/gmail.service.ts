import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Base64} from 'js-base64';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  readonly BASE_URL: string = 'https://www.googleapis.com/gmail/v1/users/me/';

  constructor(private http: HttpClient) { }

  getMail(mailId: string): Observable<IResp2>{
    return this.http.get<IResp2>(this.BASE_URL +  `messages/${mailId}`).pipe(
      map(mail => {
        if (mail.payload.mimeType !== 'multipart/alternative'){
          mail.payload.body.data = Base64.decode(mail.payload.body.data);
        }else{
          mail.payload.parts.forEach(part => {
            part.body.data = Base64.decode(part.body.data);
          });
        }
        return mail;
      })
    );
  }

  getAllEmails(): Observable<IResp2> {

    return Observable.create(observer=>{

      this.http.get<IResp1>(this.BASE_URL + 'messages?labelIds=INBOX').subscribe(resp1=>{
        resp1.messages.forEach((msg,index) => {
          this.http.get<IResp2>(this.BASE_URL + `messages/${msg.id}`).subscribe(mail=>{
            if (mail.payload.mimeType !== 'multipart/alternative'){
              mail.payload.body.data = Base64.decode(mail.payload.body.data);
            }else{
              mail.payload.parts.forEach(part => {
                part.body.data = Base64.decode(part.body.data);
              });
            }
            observer.next(mail);
            if (index == (resp1.messages.length - 1)){
              observer.complete();
            }
          });
        })
      });

    });
  }
}

interface IResp1 {
  messages: Array<{id: string, threadId: string}>;
  resultSizeEstimate: number;
}

export interface IResp2 {
  id: string;
  snippet: string;
  payload: {
    headers: Array<{name: string, value: string}>
    mimeType: string,
    body: {
      data: string
    },
    parts: Array<{body:{data:string}, mimeType: string}>
  };
}

