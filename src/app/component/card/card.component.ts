import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    trigger('animation', [
      state('open', style({
        backgroundPosition:'-3519px 0',
        transition: 'background 1s steps(55)'
      })),
      state('closed', style({
        backgroundPosition:'0 0',
        transition: 'background 1s steps(55)'
      }))
    ])
  ]
})
export class CardComponent implements OnInit {
  @Input() tweet;
  @Output() open: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  public expanded = false;
  public favorite: boolean;
  public animated = false;
  
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
        console.log(this.favorite);
        this.favorite = true;
      }
    });
  }

  openBox(e) {
    this.expanded = !this.expanded;
    this.open.emit(this.expanded);

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
          this.animated = false;
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
            this.animated = true;


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
