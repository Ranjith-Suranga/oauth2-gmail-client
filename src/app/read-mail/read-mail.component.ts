import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GmailService, IResp2} from '../service/gmail.service';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';

@Component({
  selector: 'app-read-mail',
  templateUrl: './read-mail.component.html',
  styleUrls: ['./read-mail.component.css']
})
export class ReadMailComponent implements OnInit {

  subject: string = '';
  from: string = '';
  message: string | SafeValue = '';

  constructor(private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router, private gmailService: GmailService) {
  }

  ngOnInit() {
    const mailId = this.activatedRoute.snapshot.paramMap.get('mailId');
    this.gmailService.getMail(mailId).subscribe(mail => {
      this.subject = mail.payload.headers.find(header => header.name === 'Subject').value;
      this.from = mail.payload.headers.find(header => header.name == 'From').value;
      this.message = this.formatMessage(mail);
    });
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/main']);
  }

  formatMessage(mail: IResp2): string | SafeValue {
    if (mail.payload.mimeType !== 'multipart/alternative') {
      if (mail.payload.mimeType == 'text/html') {
        return this.sanitizer.bypassSecurityTrustHtml(mail.payload.body.data);
      } else {
        return mail.payload.body.data.replace(/\n/g, '<br>');
      }
    } else {
      const part = mail.payload.parts.find(part => part.mimeType == 'text/html');
      if (part) {
        return this.sanitizer.bypassSecurityTrustHtml(part.body.data);
      } else {
        return mail.payload.parts[0].body.data.replace(/\n/g, '<br>');
      }
    }
  }

}
