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
  innerWidth = window.innerWidth;

  constructor() {}

  ngOnInit(): void {
    this.field.x = (this.innerWidth * 0.25) + 1;
    this.draggingCorner = false;
    this.draggingWindow = false;
    this.minArea = 15000;
  }

  onWindowPress(event: MouseEvent): void {
    this.draggingWindow = true;
    this.field.px = event.clientX;
    this.field.py = event.clientY;
  }

  onWindowDrag(event: MouseEvent): void {
    if (!this.draggingWindow) {
      return;
    }
    const offsetX = event.clientX - this.field.px;
    const offsetY = event.clientY - this.field.py;

    if (this.field.x + offsetX >= this.innerWidth * 0.25) {
      this.field.x += offsetX;
      this.field.y += offsetY;
      this.field.px = event.clientX;
      this.field.py = event.clientY;
    }
  }

  bottomRightResize(offsetX: number, offsetY: number): void {
    this.field.width += offsetX;
    this.field.height += offsetY;
  }

  onCornerClick(event: MouseEvent, resizer?: Function): void {
    this.draggingCorner = true;
    this.field.px = event.clientX;
    this.field.py = event.clientY;
    this.resizer = resizer;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent): void {
    if (!this.draggingCorner) {
      return;
    }

    const offsetX = event.clientX - this.field.px;
    const offsetY = event.clientY - this.field.py;

    const lastX = this.field.x;
    const lastY = this.field.y;
    const pWidth = this.field.width;
    const pHeight = this.field.height;

    this.resizer(offsetX, offsetY);
    if (this.area() < this.minArea) {
      this.field.x = lastX;
      this.field.y = lastY;
      this.field.width = pWidth;
      this.field.height = pHeight;
    }

    this.field.px = event.clientX;
    this.field.py = event.clientY;
  }

  @HostListener('document: mouseup', ['$event'])
  onCornerRelease(event: MouseEvent): void {
    this.draggingWindow = false;
    this.draggingCorner = false;
  }

  area(): number {
    return this.field.width * this.field.height;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = event.target.innerWidt;
  }
}
