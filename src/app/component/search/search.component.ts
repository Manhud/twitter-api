import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
} from '@angular/forms';
import { TwitterApiService } from 'src/app/services/twitter-api.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search: any;
  searchObservable: Subject<string> = new Subject<string>();
  @Output() tweets = new EventEmitter<any>();
  @Output() empty = new EventEmitter<any>();
  @Output() loading = new EventEmitter<any>();


  constructor(private _service: TwitterApiService) {}

  ngOnInit(): void {
    this.searchObservable
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((res) => {
        if(res){
          this.getTweets(res);
        }else{
          return;
        }
      });
  }
  changed(text: string) {
    this.searchObservable.next(text);
  }

  getTweets(query) {
    this.loading.emit(true);
    this._service.searchTweets(query).subscribe( (res: any[] = []) => {
      if(res.length === 0){
        this.empty.emit(true); 
      }else{
        this.empty.emit(false); 
      }
      this.loading.emit(false);
      this.tweets.emit(res);
    });
  }
}