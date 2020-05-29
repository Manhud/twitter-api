import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CardComponent } from './component/card/card.component';
import { SearchComponent } from './component/search/search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TwitterApiService } from './services/twitter-api.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [TwitterApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }