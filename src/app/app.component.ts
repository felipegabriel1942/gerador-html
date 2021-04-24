import { Component, OnInit } from '@angular/core';
import { Field } from './models/field.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  fields: Field[] = [];

  constructor() {}

  ngOnInit(): void {

  }

  addField() {
    this.fields.push(new Field());
  }

  fieldsState() {
    console.log(this.fields);
  }
}
