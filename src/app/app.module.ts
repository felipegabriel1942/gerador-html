import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResizableDraggableComponent } from './resizable-draggable/resizable-draggable.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { FieldComponent } from './field/field.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ResizableDraggableComponent,
    ChatWindowComponent,
    FieldComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
