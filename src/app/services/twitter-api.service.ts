import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck }  from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TwitterApiService {

  constructor(private http: HttpClient) {
  }
  
  
  searchTweets(query, counter?){
    return this.http.post(`https://twitter-backend1.herokuapp.com/search/${query}`, {count: counter}).pipe(
      pluck('data', 'statuses')
    )
  }

  getTweet(id){
    return this.http.get(`https://twitter-backend1.herokuapp.com/tweet/${id}`).pipe(
      pluck('data')
    )
  }
  
  favoriteTweet(id){
    return this.http.post(`https://twitter-backend1.herokuapp.com/favorite`, id)
  }
  desfavoriteTweet(id){
    return this.http.post(`https://twitter-backend1.herokuapp.com/favorite/destroy`, id)
  }
}