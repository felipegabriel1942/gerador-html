import { Component, OnInit } from '@angular/core';
import { Field } from './models/field.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  fields: Field[] = [];
  html: string = '';

  constructor() {}

  ngOnInit(): void {}

  addField(): void {
    this.fields.push(new Field());

  }

  generateHtml(): void {
    this.fields.forEach((field) => {
      this.html += `<div style="top:${field.y};left:${field.x};width:${field.width};height:${field.height};border: 1px solid black; position: absolute;"> </div>`;
    });
    console.log(this.html);
  }

  createFieldsHtml(): void {

  }
}
