import { Component, OnInit, Input } from '@angular/core';
import { TwitterApiService } from '../../services/twitter-api.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flip', [
      state('0', style({ transform: 'rotateX(0deg)' })),
      state('1', style({ transform: 'rotateX(180deg)' })),
      transition('0 => 1', animate('300ms ease-in')),
      transition('1 => 0', animate('300ms ease-out'))
  ]),
    trigger('openClose', [
      state('open', style({
        height: '250px',
      })),
      state('closed', style({
        height: '30px',
      })),
      transition('open => closed', [
        animate('250ms')
      ]),
      transition('closed => open', [
        animate('250ms')
      ]),
    ]),
  ]
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
    // this.open === true
    //   ? (e.path[1].style.height = '200px')
    //   : (e.path[1].style.height = '');
  }

  shared() {
  
  }


  favoriteTweet(id, e) {
    const favorite = { id };
    if (this.favorite) {
      this.twitterService.desfavoriteTweet(favorite).subscribe(
        (res: any) => {
          e.path[0].classList.remove('animation-on')
          e.path[0].classList.add('animation-off')

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
            e.path[0].classList.remove('animation-off')
            e.path[0].classList.add('animation-on')
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
