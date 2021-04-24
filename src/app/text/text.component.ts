import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Text } from '../models/text.model';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  @Input() text: Text;

  minArea: number;
  draggingCorner: boolean;
  draggingWindow: boolean;
  resizer: Function;

  constructor() {}

  ngOnInit(): void {
    this.draggingCorner = false;
    this.draggingWindow = false;
    this.minArea = 15000;
  }

  onWindowPress(event: MouseEvent): void {
    this.draggingWindow = true;
    this.text.px = event.clientX;
    this.text.py = event.clientY;
    console.log(this.draggingWindow, this.text.px, this.text.py);
  }

  onWindowDrag(event: MouseEvent): void {
    if (!this.draggingWindow) {
      return;
    }

    let offsetX = event.clientX - this.text.px;
    let offsetY = event.clientY - this.text.py;

    this.text.x += offsetX;
    this.text.y += offsetY;
    this.text.px = event.clientX;
    this.text.py = event.clientY;
    console.log('dragging window...');
  }

  bottomRightResize(offsetX: number, offsetY: number): void {
    this.text.width += offsetX;
    this.text.height += offsetY;
  }

  onCornerClick(event: MouseEvent, resizer?: Function): void {
    this.draggingCorner = true;
    this.text.px = event.clientX;
    this.text.py = event.clientY;
    this.resizer = resizer;
    event.preventDefault();
    event.stopPropagation();
    console.log('corner clicked...');
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent): void {
    if (!this.draggingCorner) {
      return;
    }

    let offsetX = event.clientX - this.text.px;
    let offsetY = event.clientY - this.text.py;

    let lastX = this.text.x;
    let lastY = this.text.y;
    let pWidth = this.text.width;
    let pHeight = this.text.height;

    this.resizer(offsetX, offsetY);
    if (this.area() < this.minArea) {
      this.text.x = lastX;
      this.text.y = lastY;
      this.text.width = pWidth;
      this.text.height = pHeight;
    }

    this.text.px = event.clientX;
    this.text.py = event.clientY;
    console.log('resizing...');
  }

  @HostListener('document: mouseup', ['$event'])
  onCornerRelease(event: MouseEvent): void {
    this.draggingWindow = false;
    this.draggingCorner = false;
    console.log('text released...');
  }

  area(): number {
    return this.text.width * this.text.height;
  }

}
