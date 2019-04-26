import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  viewPortHeight: string = window.innerHeight + 'px';

  @HostListener('window:resize')
  calculateViewPortHeight(): void{
    this.viewPortHeight = window.innerHeight + 'px';
  }

}
