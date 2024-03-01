import { Component, OnInit } from '@angular/core';
import {EventService} from "../../_services/event.service";
import {DomSanitizer} from "@angular/platform-browser";
import {eventFile} from "../../models/eventFile";
import {event} from "../../models/event";

@Component({
  selector: 'app-browse-events',
  templateUrl: './browse-events.component.html',
  styleUrls: ['./browse-events.component.scss']
})
export class BrowseEventsComponent implements OnInit {

  EventsList!: event[];
  status!: string;
  list: event[] = [];
  search!: boolean;
  e!: event;
  keyword!: string;
  files: eventFile[]=[];
  url!: URL;
  paths: any[] = [];
  secured: any;
  tmp: any;
  constructor(private ES:EventService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.ES.FindAllEvents().subscribe(res => {
      console.log(res);
      this.EventsList = res;
    })


  }

}
