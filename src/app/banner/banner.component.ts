import { animate, state, style, transition, trigger } from '@angular/animations';
import { Time } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  frame = 0;

  elemWidth = 500;

  elem1Top = 300;
  elem1Left = 0;

  elem2Top = 300;
  elem2Left = 0;

  banneridx = 1;

  windowWidth = 0;
  windowHeight = 0;

  moveToLeft = false;
  moveToRight = false;

  bannerMoveRemain = 0;
  bannerLeft = 0;

  maxSpeed = 30;
  minSpeed = 5;
  speed = 0;

  start: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    this.elem1Left = this.windowWidth / 2 - this.elemWidth / 2;
    console.log(this.windowWidth);
    console.log(this.elem1Left);
    this.bannerLeft = this.windowWidth / 2 - this.elemWidth / 2;
    this.elem2Left = -2000;
  }

  ngAfterViewInit() {
    window.requestAnimationFrame(() => this.animate(this));
  }

  animate(that: any) {
    let currtime = new Date().getTime();
    if (that.start == 0) {
      that.start = currtime;
      window.requestAnimationFrame(() => that.animate(that));
    }
    let elapsed = currtime - that.start;
    that.start = currtime;

    that.frame++;
    let remainabs = that.bannerMoveRemain > 0 ?
      that.bannerMoveRemain : that.bannerMoveRemain * -1;

    if (remainabs > 1) {
      let adjustedSpeed = that.speed * elapsed / 10;

      if (remainabs > that.maxSpeed * 6) {
        that.speed++;
        if (that.speed > that.maxSpeed) {
          that.speed = that.maxSpeed;
        }
      } else {
        that.speed--;
        if (that.speed < that.minSpeed) {
          that.speed = that.minSpeed;
        }
      }

      if (remainabs < that.speed) {
        adjustedSpeed = remainabs;
      }

      if (that.bannerMoveRemain < 0) {
        that.elem1Left -= adjustedSpeed;
        that.elem2Left -= adjustedSpeed;
        that.bannerMoveRemain += adjustedSpeed;
      } else {
        that.elem1Left += adjustedSpeed;
        that.elem2Left += adjustedSpeed;
        that.bannerMoveRemain -= adjustedSpeed;
      }
    }
    window.requestAnimationFrame(() => that.animate(that));
  }

  leftBanner() {
    if (this.bannerMoveRemain != 0)
      return;
    if (this.banneridx == 1) {
      this.elem2Left = -1 * this.elemWidth;
      this.bannerMoveRemain = this.bannerLeft + this.elemWidth + 1;
      this.banneridx = 2;
      console.log("Banner to 2")
    } else {
      this.elem1Left = -1 * this.elemWidth;
      this.bannerMoveRemain = this.bannerLeft + this.elemWidth + 1;
      this.banneridx = 1;
      console.log("Banner to 1")
    }
  }

  rightBanner() {
    if (this.bannerMoveRemain != 0)
      return;
    if (this.banneridx == 1) {
      this.elem2Left = this.windowWidth;
      this.bannerMoveRemain = (this.windowWidth - this.bannerLeft) * -1;
      this.banneridx = 2;
    } else {
      this.elem1Left = this.windowWidth;
      this.bannerMoveRemain = (this.windowWidth - this.bannerLeft) * -1;
      this.banneridx = 1;
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    this.elem1Left = this.windowWidth / 2 - this.elemWidth / 2;
    console.log(this.windowWidth);
    console.log(this.elem1Left);
    this.bannerLeft = this.windowWidth / 2 - this.elemWidth / 2;
    this.elem2Left = -2000;
  }
}
