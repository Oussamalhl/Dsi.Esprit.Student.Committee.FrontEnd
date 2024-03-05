import {Component, OnInit} from '@angular/core';
import {event} from "../../../models/event";
import {eventFile} from "../../../models/eventFile";
import {EventService} from "../../../_services/event.service";
import {DomSanitizer} from "@angular/platform-browser";
import {TokenStorageService} from "../../../_services/token-storage.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
  files: eventFile[] = [];
  url!: URL;
  paths: any[] = [];
  secured: any;
  tmp: any;
  participatable!: boolean
  participatables: boolean[] = []
  isDone: boolean = false

  constructor(private _router: Router, private ES: EventService, private sanitizer: DomSanitizer) {

  }


  // checkParticipation(idEvent:number){
  //   this.ES.getUserCheck(idEvent).subscribe(res =>{
  //     console.log("participatable: "+res);
  //     return this.participatable=res;
  //   } )
  //   return this.participatable
  // }
  Participate(idEvent: number) {

    this.ES.Participate(idEvent).subscribe(res => console.log("participation confirmed"));
    this._router.navigate(['/events/club']).then(() => {
      window.location.reload();
    })


  }

  ngOnInit(): void {
    this.isDone = false
    this.participatables = []
    this.ES.GetUserClubId().subscribe(res => {

      console.log("clubid:" + res)
      this.ES.GetClubEvents(res).subscribe(res => {
        console.log("club events: " + res);
        this.ClubEventsList = res;
        this.ClubEventsList.forEach(e => {
          this.ES.getUserCheck(e.id).subscribe(res => {
            //console.log("participatable: " + res);
            this.participatables.push(res);
            //console.log("participatables: " + this.participatables)

          })

        })
        this.isDone = true
      })
    })

  }

}
