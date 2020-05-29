import { Component, OnInit, Input } from '@angular/core';
import { TwitterApiService } from '../../services/twitter-api.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() tweet;
  public favorite: boolean;
  public open = false;

  constructor(
    private twitterService: TwitterApiService,
  ) {
  }

  ngOnInit(): void {
    this.getInfoTweet();
  }

  getInfoTweet() {
    this.twitterService.getTweet(this.tweet.id_str).subscribe((res) => {
      if (res[0].favorited) {
        this.favorite = true;
      }
    });
  }

  openBox(e) {
    this.open = !this.open;
    this.open === true
      ? (e.path[1].style.height = '200px')
      : (e.path[1].style.height = '');
  }

  shared() {
  
  }

  favoriteTweet(id) {
    const favorite = { id };
    if (this.favorite) {
      this.twitterService.desfavoriteTweet(favorite).subscribe(
        (res: any) => {
          this.favorite = false;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.twitterService.favoriteTweet(favorite).subscribe(
        (res: any) => {
          if (res.statusCode === 200) {
            this.favorite = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
