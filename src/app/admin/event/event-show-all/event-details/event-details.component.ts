import { Component, OnInit } from '@angular/core';
import {EventService} from "../../../../_services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {event} from "../../../../models/event";
import {eventFile} from "../../../../models/eventFile";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  name: string = "";
  id!: number;
  e!: event;
  files: eventFile[] = [];
  retrievedImages: eventFile[] = [];
  src: any[] = []
  dataParticipations!:any;

  constructor(private ES: EventService, private _router: Router, private _Activatedroute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  getConfirmations(){
    this.ES.countEventParticipations(this.id).subscribe(resAll=>{
      console.log("allParticipations "+resAll);
      this.ES.countEventConfirmed(this.id).subscribe(resConfirmed=>{
        console.log("allConfirmedParticipations "+resConfirmed);
        this.dataParticipations = {
          labels: ['Confirmed', 'Not Confirmed'],
          datasets: [
            {
              label: 'Type',
              backgroundColor: ['#2ea209', '#e12222'],
              data: [resConfirmed, resAll-resConfirmed]
            }
          ]
        }
      })
    })

  }

  ngOnInit(): void {
    this.id = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    this.getConfirmations();

    if (this.id != null) {
      this.ES.GetEvent(this.id).subscribe(res => {
        //console.log(res);
        this.e = res;
        this.name = this.e.name;
        this.ES.GetEventClubs(res.id).subscribe(c=>this.e.clubs=c)

      });
      this.ES.GetEventFiles(this.id).subscribe(res => {
        this.files = res;
        //console.log(res);
        res.forEach(f => {
          if (!f.filePath.includes(".pdf")) {
            this.retrievedImages.push(f);
            this.src.push(this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))

          }
        })
      })

    }
  }

}
