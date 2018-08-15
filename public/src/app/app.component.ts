import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newCake = {};
  constructor(private _httpService: HttpService) {}
  cakes = [];
  clickedDetail = false;
  singleDetail = {};
  newComment = { };
  ngOnInit() {
    this.getCakes();
  }
  getCakes() {
    let observable = this._httpService.getCakes();
    observable.subscribe(data=> {
      this.cakes = data['data'];
      for (let cake of this.cakes) {
        this.newComment[cake._id] = {};
      }
    });
  }
  onSubmit() {
    let observable = this._httpService.createCake(this.newCake);
    observable.subscribe(data=> {
      this.getCakes();
    });
  }
  viewDetail(id) {
    let observable = this._httpService.viewDetail(id);
    observable.subscribe(data=> {
      this.clickedDetail = true;
      this.singleDetail = data['data'];
      var sum = 0;
      if (this.singleDetail['comments'].length > 0) {
        for (var comment of this.singleDetail['comments']) {
          sum += comment['rating'];
        }
        var average_rating = (sum / this.singleDetail['comments'].length);
        this.singleDetail['average_rating'] = average_rating;
      } 
    })
  }
  addComment(id) {
    let observable = this._httpService.addComment(id, this.newComment[id]);
    observable.subscribe(data=> {
      this.viewDetail(id);
      this.newComment[id] = {};
    });
  }
}