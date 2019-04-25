import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // @ts-ignore
    const fragment: string = this.route.fragment.value;
    let accessToken = sessionStorage.getItem('access_token');
    if (fragment !== null) {
      accessToken = fragment.split('&').find(value => {
        return value.startsWith('access_token');
      }).split('=')[1];
      sessionStorage.setItem('access_token', accessToken);
    }
    if (accessToken == null) {
      this.router.navigate(['/main']);
    }
  }

}
