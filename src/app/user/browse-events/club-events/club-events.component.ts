import { Component, OnInit } from '@angular/core';
import {event} from "../../../models/event";
import {eventFile} from "../../../models/eventFile";
import {EventService} from "../../../_services/event.service";
import {DomSanitizer} from "@angular/platform-browser";
import {TokenStorageService} from "../../../_services/token-storage.service";

@Component({
  selector: 'app-club-events',
  templateUrl: './club-events.component.html',
  styleUrls: ['./club-events.component.scss']
})
export class ClubEventsComponent implements OnInit {
  ClubEventsList!: event[];
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
  clubId!:number
  participatable!:boolean
  constructor(private ES:EventService, private sanitizer: DomSanitizer) { }

  checkParticipation(idEvent:number){
    this.ES.getUserCheck(idEvent).subscribe(res =>{
      console.log("participatable: "+res);
      return this.participatable = res;
    } )
  }

  ngOnInit(): void {
    this.ES.GetUserClubId().subscribe(res=>{
      this.clubId=res;
      console.log("clubid:"+res)
      this.ES.GetClubEvents(this.clubId).subscribe(res => {
        console.log("club events: "+res);
        this.ClubEventsList = res;
      })

    })



  }

}
