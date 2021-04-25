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
  }

  onWindowDrag(event: MouseEvent): void {
    if (!this.draggingWindow) {
      return;
    }

    const offsetX = event.clientX - this.text.px;
    const offsetY = event.clientY - this.text.py;

    this.text.x += offsetX;
    this.text.y += offsetY;
    this.text.px = event.clientX;
    this.text.py = event.clientY;
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
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent): void {
    if (!this.draggingCorner) {
      return;
    }

    const offsetX = event.clientX - this.text.px;
    const offsetY = event.clientY - this.text.py;

    const lastX = this.text.x;
    const lastY = this.text.y;
    const pWidth = this.text.width;
    const pHeight = this.text.height;

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
  }

  area(): number {
    return this.text.width * this.text.height;
  }

}
