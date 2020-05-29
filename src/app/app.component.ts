import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tweets: any[] = [];
  title = 'twitter';
  loading = false;
  empty = false;

  ngOnInit(): void {
  }

  createTweets(tweets){
    this.tweets = tweets;
  }

}