import { Component, Input, OnInit } from '@angular/core';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2,
}

@Component({
  selector: 'app-resizable-draggable',
  templateUrl: './resizable-draggable.component.html',
  styleUrls: ['./resizable-draggable.component.css'],
})
export class ResizableDraggableComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;
  @Input() left: number;
  @Input() top: number;

  boxPosition: { left: number; top: number };
  containerPos: { left: number; top: number; right: number; bottom: number };
  mouse: { x: number; y: number };
  //TODO: analizar o que faz
  status: Status = Status.OFF;
  mouseClick: { x: number; y: number; left: number; top: number };

  constructor() {}

  ngOnInit(): void {}

  setStatus(event: MouseEvent, status: number): void {
    if (status === 1) {
      event.stopPropagation();
    } else if (status === 2) {
      this.mouseClick = {
        x: event.clientX,
        y: event.clientY,
        left: this.left,
        top: this.top,
      };
    } else {
      this.status = status;
    }
  }
}
