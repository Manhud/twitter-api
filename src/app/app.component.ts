import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { TwitterApiService } from './services/twitter-api.service';
import { CardComponent } from './component/card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChildren(CardComponent) cards: QueryList<CardComponent>;
  word2: string;
  tweets: any[] = [];
  loading = false;
  loadingScroll = false;
  empty = false;
  counter: number = 9;

  public set word(word: string) {
    this.word2 = word;
    this.counter = 9;
  }

  constructor(private twitterService: TwitterApiService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cards.changes.subscribe((cards: QueryList<CardComponent>) => {
      cards.forEach((card: CardComponent) => {
        card.open.subscribe((state) => {
          this.openPanel(card, state);
        });
      });
    });
  }

  openPanel(card: CardComponent, condition: boolean) {
    this.cards.forEach((cardIterator: any) => {
      if (card === cardIterator) {
        cardIterator.expanded = condition;
      } else {
        cardIterator.expanded = false;
      }
    });
  }

  createTweets(tweets) {
    this.tweets = tweets;
  }

  onScroll() {
    this.loadingScroll = true;
    this.counter = this.counter + 9;
    this.twitterService
      .searchTweets(this.word2, this.counter)
      .subscribe((res: any[]) => {
        this.loadingScroll = false;
        this.tweets = res;
      });
  }
}
