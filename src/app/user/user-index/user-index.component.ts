import {Component, OnInit} from '@angular/core';
import {DomSanitizer, Title} from "@angular/platform-browser";
import {EventService} from "../../_services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {event} from "../../models/event";
import {eventFile} from "../../models/eventFile";
import {ReclamationService} from "../../_services/reclamation.service";
import {ClubService} from "../../_services/club.service";

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {

  name: string = "";
  id!: number;
  events!: event[];
  nextEvents!: event[]
  files: eventFile[] = [];
  retrievedImages: eventFile[] = [];
  src: any[] = []
  allDoneReclamations!:number
  allEvents!:number
  allClubsParticipations!:number
  allEventsParticipations!:number

  constructor(private titleService: Title,private CS: ClubService, private RS: ReclamationService, private ES: EventService, private _router: Router, private _Activatedroute: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.titleService.setTitle("Home");
  }

  ngOnInit(): void {

    this.RS.countAllDoneReclamation().subscribe(res=>{
      this.allDoneReclamations=res;
    })
    this.ES.countAllEvents().subscribe(res=>{
      this.allEvents=res;
    })
    this.CS.countAllClubsParticipations().subscribe(res=>{
      this.allClubsParticipations=res;
    })
    this.ES.countAllEventsParticipations().subscribe(res=>{
      this.allEventsParticipations=res;
    })
    this.ES.upcomingEvents().subscribe(res => {
      //console.log(res);
      this.events = res;
      this.events.forEach(e => {
        this.files = []
        this.ES.GetEventFiles(e.id).subscribe(res => {
          this.files = res;
          //this.src=[]
          if (this.files.length > 0) {
            console.log("files: " + this.files);
            this.files.forEach(f => {
                console.log("f: " + f.fileName);
                //this.retrievedImages.push(f);
                e.files = [f]
                e.files[0].src = (this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
                //this.src.push(this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
                console.log("src: " + e.files[0].src);

              }
            )
          }
        })
        this.ES.countEventConfirmed(e.id).subscribe(res => {
          console.log("count: "+res)
          e.places = e.places - res;
        })
      })
    });

    this.ES.nextUpcomingEvents().subscribe(res => {
      //console.log(res);
      this.nextEvents = res;
      this.nextEvents.forEach(e => {
        this.files = []
        this.ES.GetEventFiles(e.id).subscribe(res => {
          this.files = res;
          //this.src=[]
          if (this.files.length > 0) {
            console.log("files: " + this.files);
            this.files.forEach(f => {
                console.log("f: " + f.fileName);
                //this.retrievedImages.push(f);
                e.files = [f]
                e.files[0].src = (this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
                //this.src.push(this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
                console.log("src: " + e.files[0].src);

              }
            )
          }
        })
        this.ES.countEventConfirmed(e.id).subscribe(res => {
          e.places = e.places - res;
        })
      })
    });


  }

}
