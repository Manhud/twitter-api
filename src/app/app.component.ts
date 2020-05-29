import { Component, OnInit } from '@angular/core';
import { TwitterApiService } from './services/twitter-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  word2:string;
  tweets: any[] = [];
  loading = false;
  loadingScroll = false;
  empty = false;
  counter:number = 9;

  public set word(word: string) {
    this.word2 = word;
    this.counter = 9
  }
  
  constructor(private twitterService: TwitterApiService) {}

  ngOnInit(): void {}

  createTweets(tweets) {
    this.tweets = tweets;
  }

  onScroll() {
    this.loadingScroll = true;
    this.counter = this.counter + 9;
    this.twitterService.searchTweets(this.word2, this.counter).subscribe((res:any[]) => {
      this.loadingScroll = false;
      this.tweets = res;
    });
  }
}


