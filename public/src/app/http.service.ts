import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
  }
  getCakes() {
    return this._http.get('/api/cakes');
  }
  createCake(newCake) {
    return this._http.post('/api/cakes', newCake);
  }
  viewDetail(id) {
    return this._http.get('/api/cake/' + id);
  }
  addComment(id, newComment) {
    console.log(newComment);
    return this._http.post('/api/'+ id + '/comment', newComment);
  }
  
}
