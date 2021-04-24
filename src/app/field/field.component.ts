import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Field } from '../models/field.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent implements OnInit {
  @Input() field: Field;

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

  onWindowPress(event: MouseEvent) {
    this.draggingWindow = true;
    this.field.px = event.clientX;
    this.field.py = event.clientY;
    console.log(this.draggingWindow, this.field.px, this.field.py);
  }

  onWindowDrag(event: MouseEvent) {
    if (!this.draggingWindow) {
      return;
    }

    let offsetX = event.clientX - this.field.px;
    let offsetY = event.clientY - this.field.py;

    this.field.x += offsetX;
    this.field.y += offsetY;
    this.field.px = event.clientX;
    this.field.py = event.clientY;
    console.log('dragging window...');
  }

  bottomRightResize(offsetX: number, offsetY: number) {
    this.field.width += offsetX;
    this.field.height += offsetY;
  }

  onCornerClick(event: MouseEvent, resizer?: Function) {
    this.draggingCorner = true;
    this.field.px = event.clientX;
    this.field.py = event.clientY;
    this.resizer = resizer;
    event.preventDefault();
    event.stopPropagation();
    console.log('corner clicked...');
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent) {
    if (!this.draggingCorner) {
      return;
    }

    let offsetX = event.clientX - this.field.px;
    let offsetY = event.clientY - this.field.py;

    let lastX = this.field.x;
    let lastY = this.field.y;
    let pWidth = this.field.width;
    let pHeight = this.field.height;

    this.resizer(offsetX, offsetY);
    if (this.area() < this.minArea) {
      this.field.x = lastX;
      this.field.y = lastY;
      this.field.width = pWidth;
      this.field.height = pHeight;
    }

    this.field.px = event.clientX;
    this.field.py = event.clientY;
    console.log('resizing...')
  }

  @HostListener('document: mouseup', ['$event'])
  onCornerRelease(event: MouseEvent) {
    this.draggingWindow = false;
    this.draggingCorner = false;
    console.log('field released...');
  }

  area() {
    return this.field.width * this.field.height;
  }
}
