import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MapService } from './components/map.service';
import { AppComponent }  from './components/app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent ],
  providers: [MapService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
