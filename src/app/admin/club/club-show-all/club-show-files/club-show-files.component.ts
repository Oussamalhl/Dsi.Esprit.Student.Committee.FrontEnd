import { Component, OnInit } from '@angular/core';
import {event} from "../../../../models/event";
import {eventFile} from "../../../../models/eventFile";
import {EventService} from "../../../../_services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Club} from "../../../../models/Club";
import {ClubService} from "../../../../_services/club.service";

@Component({
  selector: 'app-club-show-files',
  templateUrl: './club-show-files.component.html',
  styleUrls: ['./club-show-files.component.scss']
})
export class ClubShowFilesComponent implements OnInit {

  name: string = "";
  id!: number;
  c!: Club;
  files: eventFile[] = [];
  pdf: any[] = [];
  secured: any;
  pdfFiles: eventFile[] = [];
  retrievedImages: eventFile[] = [];
  src: any[] = []

  constructor(private CS: ClubService, private _router: Router, private _Activatedroute: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  Remove(id: number) {

    // this.tmp = (new URL(f.filePath)).toString();
    this.CS.RemoveClubFile(id).subscribe(res => {
      console.log(res);
      console.log("File Deleted");
    });

    //window.location.reload()
    setTimeout(() => this.reload(), 2000);
  }



  reload() {
    this.pdf = [];
    this.retrievedImages=[]
    this.CS.GetClubFiles(this.id).subscribe(res => {
      this.files = res;
      //console.log(res);
      res.forEach(f => {
        if (f.fileName.includes(".pdf")) {
          this.secured = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + f.picByte);
          this.pdf.push(this.secured);
          this.pdfFiles.push(f);

        } else if (f.fileName.includes(".png") || f.fileName.includes(".jpg")){
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
      this.CS.GetClub(this.id).subscribe(res => {
        console.log(res);
        this.c = res;
        this.name = this.c.name;
        this.reload();
      });
    }
  }

}
