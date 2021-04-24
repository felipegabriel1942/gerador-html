import { Component, OnInit } from '@angular/core';
import { Field } from './models/field.model';
import { Text } from './models/text.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  fields: Field[] = [];
  texts: Text[] = [];

  constructor() {}

  ngOnInit(): void {}

  addField(): void {
    this.fields.push(new Field());
  }

  addText(): void {
    this.texts.push(new Text());
  }

  generateHtml(): void {
    let html = '';

    html = this.generateFields(html);
    html = this.genereateTexts(html);

    console.log(html);
  }

  generateFields(html: string): string {
    this.fields.map((field) => {
      html += `<div style="top:${field.y};left:${field.x};width:${field.width};height:${field.height};border: 1px solid black;position: absolute;"> </div>`;
    });

    return html;
  }

  genereateTexts(html: string): string {
    this.texts.forEach((text) => {
      html += `<input style="top:${text.y};left:${text.x};width:${text.width};height:${text.height};position: absolute; border: 0; background-color: rgba(0, 0, 0, 0);" value="${text.text}"/>`;
    });

    return html;
  }
}
