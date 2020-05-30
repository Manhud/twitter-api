import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TwitterApiService } from 'src/app/services/twitter-api.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  search: any;
  searchObservable: Subject<string> = new Subject<string>();
  @Output() word = new EventEmitter<any>();
  @Output() tweets = new EventEmitter<any>();
  @Output() empty = new EventEmitter<any>();
  @Output() loading = new EventEmitter<any>();

  constructor(private _service: TwitterApiService, private fb: FormBuilder) {
    this.form = fb.group({
      search: ['', Validators.pattern('[a-z A-Z áãâäàéêëèíîïìóõôöòúûüùçñ 0-9]+')]
    });
  }

  ngOnInit(): void {
    this.searchObservable
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((res) => {
        if (res) {
          this.getTweets(res);
        } else {
          this.tweets.emit([]);
          return;
        }
      });
  }
  changed(text: string) {
    if(this.form.valid){
      this.searchObservable.next(text);
    }else{
      return;
    }
  }

  clean(){
    this.form.reset();
  }

  getTweets(query) {
    this.word.emit(query);
    this.loading.emit(true);
    this._service.searchTweets(query, 9).subscribe((res: any[] = []) => {
      if (res.length === 0) {
        this.empty.emit(true);
      } else {
        this.empty.emit(false);
      }
      this.loading.emit(false);
      this.tweets.emit(res);
    });
  }
}
