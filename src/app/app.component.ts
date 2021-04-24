import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  field = {
    x: 300,
    y: 100,
    px: 0,
    py: 0,
    width: 300,
    height: 50
  };

  fields = [];

  constructor() {}

  ngOnInit(): void {

  }

  addField() {
    this.fields.push(this.field);
  }

  fieldsState() {
    console.log(this.fields);
  }
}
