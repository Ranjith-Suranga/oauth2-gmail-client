import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('imgLogo')
  imgLogo: ElementRef;

  enterAnimation(): void {
    this.imgLogo.nativeElement.className = 'animated bounceIn';
  }

  exitAnimation(): void {
    this.imgLogo.nativeElement.className = '';
  }
}
