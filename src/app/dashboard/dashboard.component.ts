import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GmailService, IResp2} from '../service/gmail.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mails: IResp2[] = [];
  loaderWrapperVisibility: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private gmailService: GmailService) {
  }

  ngOnInit() {
    // @ts-ignore
    const fragment: string = this.route.fragment.value;
    let accessToken = sessionStorage.getItem('access_token');
    if (fragment != null) {
      try{
        accessToken = fragment.split('&').find(value => {
          return value.startsWith('access_token');
        }).split('=')[1];
        sessionStorage.setItem('access_token', accessToken);
      }catch(error){
        this.router.navigateByUrl('/');
        return;
      }
    }
    this.gmailService.getAllEmails().subscribe(mail=>{
      this.mails.push(mail);
    }, error => console.log(error),
      () => this.loaderWrapperVisibility  = false);
  }

  getFrom(mail: IResp2): string{
    return mail.payload.headers.find(header => header.name == 'From').value.replace(/<.+>/,'');
  }

  getSubject(mail: IResp2): string{
    return mail.payload.headers.find(header => header.name == 'Subject').value;
  }

  logout(): void{
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/main']);
  }

  navigate(mailId: string): void{
    this.router.navigate(['/read-mail',mailId]);
  }
}
