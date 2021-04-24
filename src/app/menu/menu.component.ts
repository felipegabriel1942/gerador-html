import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() onAddField = new EventEmitter();
  @Output() onAddText = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}
