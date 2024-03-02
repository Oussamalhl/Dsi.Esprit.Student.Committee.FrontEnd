import {Component, OnInit} from '@angular/core';
import {eventFile} from "../../../models/eventFile";
import {User} from "../../../models/User";
import {event} from "../../../models/event";
import {TokenStorageService} from "../../../_services/token-storage.service";
import {EventService} from "../../../_services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-event-details',
  templateUrl: './user-event-details.component.html',
  styleUrls: ['./user-event-details.component.scss']
})
export class UserEventDetailsComponent implements OnInit {

  name!: string;
  id!: number;
  files!: eventFile[];
  secured: any;
  isLoggedIn = false;
  pdf: any[] = [];
  pdfFiles: eventFile[] = [];
  retrievedImages: eventFile[] = [];
  username = "";
  u: User = new User();
  e: event = new event();
  participants: User[] = [];
  today = new Date();
  check: boolean = false;
  end!: string;
  src: any[] = []
  userClub!: string
  participatable!: boolean
  rating:number=0
  form = new FormGroup({
    rating: new FormControl()
  });
  constructor(private fb: FormBuilder, private ES: EventService, private _router: Router, private _Activatedroute: ActivatedRoute, private sanitizer: DomSanitizer) {

  }

  reroute() {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.username = this.tokenStorage.getUser().username;
    //   this.DS.GetUserDonor(this.username).subscribe(res => this.u = res);
    //   console.log(this.u);
    //   this._router.navigateByUrl("/Events/" + this.id + "/Rate");
    // } else this._router.navigateByUrl("/signin");

  }
  onSubmit(){
    this.rating = this.form.value.rating ?  this.form.value.rating : 0;
    this.ES.RateEvent(this.rating,this.id).subscribe(res=>console.log(res))
    console.log("rating: "+this.rating)
  }
  Participate() {
    if (!this.check)
      this._router.navigateByUrl("/events");
    else {
      this.ES.Participate(this.id).subscribe(res => console.log("participation confirmed"));
      this._router.navigateByUrl("/events");
    }

  }

  reload() {
    this.pdf = [];
    this.retrievedImages = []
    this.ES.GetEventFiles(this.id).subscribe(res => {
      this.files = res;
      //console.log(res);
      res.forEach(f => {
        if (f.fileName.includes(".pdf")) {
          this.secured = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + f.picByte);
          this.pdf.push(this.secured);
          this.pdfFiles.push(f);

        } else if (f.fileName.includes(".png") || f.fileName.includes(".jpg")) {
          this.retrievedImages.push(f);
          this.src.push(this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
        }
        //console.log(this.pdf);
      })
    })

  }

  ngOnInit(): void {

    this.id = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    if (this.id != null) {
      this.ES.EventRate(this.id).subscribe(res=> {
        this.rating=res;
        console.log("rated: "+this.rating)
        this.form.controls['rating'].setValue(this.rating);
      })

      this.ES.GetEvent(this.id).subscribe(res => {
        console.log("Event: " + res.id);
        this.e = res;
        this.name = this.e.name;
        this.end = res.eventDateEnd.toString();
        this.ES.GetEventClubs(this.id).subscribe(c => {
          this.e.clubs = c;
          console.log("Event Clubs: " + c);
        })
        this.ES.GetUserClub().subscribe(res => {
          this.userClub = res
          console.log("User Club: " + this.userClub)
          this.check = this.e.clubs.includes(this.userClub);
          console.log("Check: " + this.check)
          if (this.check) {
            this.ES.getUserCheck(this.id).subscribe(res =>{
              this.participatable = res;
              console.log("participatable: "+res);
            } )
          }
        })
      });


    }

    this.reload();


  }

}
