import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {

  constructor(private titleService:Title) {
    this.titleService.setTitle("Home");
  }

  ngOnInit(): void {
  }

}
