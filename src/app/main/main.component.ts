import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('imgLogo')
  imgLogo: ElementRef;


  ngOnInit() {
  }

  enterAnimation(): void {
    this.imgLogo.nativeElement.className = 'animated bounceIn';
  }

  exitAnimation(): void {
    this.imgLogo.nativeElement.className = '';
  }

}
