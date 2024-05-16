import {Component, OnInit} from '@angular/core';
import {DomSanitizer, Title} from "@angular/platform-browser";
import {EventService} from "../../_services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {event} from "../../models/event";
import {eventFile} from "../../models/eventFile";
import {ReclamationService} from "../../_services/reclamation.service";
import {ClubService} from "../../_services/club.service";
import {clubFile} from "../../models/clubFile";
import {Club} from "../../models/Club";

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
  cFiles: clubFile[]=[];
  retrievedImages: eventFile[] = [];
  src: any[] = []
  allDoneReclamations!:number
  allEvents!:number
  allClubsParticipations!:number
  bestClubs!:any[][]
  c!:Club;
  clubsList:Club[]=[];
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

    this.CS.bestClubs().subscribe(res => {
      console.log("best clubs: "+res);
      this.bestClubs = res;
      this.bestClubs.forEach(e => {
        this.CS.GetClubByName(e[1]).subscribe(c =>{
          console.log("club: "+c);

          this.cFiles = []
          this.CS.GetClubFiles(c.id).subscribe(res => {
            this.cFiles = res;
            //this.src=[]
            if (this.cFiles.length > 0) {
              console.log("files: " + this.cFiles);
              this.cFiles.forEach(f => {
                  console.log("f: " + f.fileName);
                  //this.retrievedImages.push(f);
                  c.files = [f]
                  c.files[0].src = (this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
                  //this.src.push(this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
                  console.log("src: " + c.files[0].src);

                }
              )
            }
            this.clubsList.push(c);
            console.log("clubs list: "+this.clubsList);
          })
        })


        // this.ES.countEventConfirmed(e.id).subscribe(res => {
        //   e.places = e.places - res;
        // })
      })
    });



  }

}
