import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-detail',
  templateUrl: './add-detail.component.html',
  styleUrls: ['./add-detail.component.css']
})
export class AddDetailComponent implements OnInit {
  @Input() cakeToShow: any;
  constructor() { }

  ngOnInit() {
  }

}
