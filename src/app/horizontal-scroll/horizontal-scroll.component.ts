import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.css']
})
export class HorizontalScrollComponent implements OnInit {
  lastKnownScrollPosition = 0;
  elemLeft = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  windowWidth = 0;
  windowHeight = 0;
  constructor() { }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    for (let i = 0; i < this.elemLeft.length; i++){
      this.elemLeft[i] = i * this.windowWidth;
    }
  }


  ngAfterViewInit() {

    document.addEventListener("scroll", (event) => {
      this.lastKnownScrollPosition = window.scrollY;


      
      console.log(window.scrollY);
      console.log(event);

      for (let i = 0; i < this.elemLeft.length; i++){
        this.elemLeft[i] = i * this.windowWidth - window.scrollY;
      }
    })};

}
