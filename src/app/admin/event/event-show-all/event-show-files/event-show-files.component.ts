import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {event} from "../../../../models/event";
import {EventService} from "../../../../_services/event.service";
import {eventFile} from "../../../../models/eventFile";

@Component({
  selector: 'app-event-show-files',
  templateUrl: './event-show-files.component.html',
  styleUrls: ['./event-show-files.component.scss']
})
export class EventShowFilesComponent implements OnInit {

  name: string = "";
  id!: number;
  e!: event;
  files: eventFile[] = [];
  pdf: any[] = [];
  secured: any;
  pdfFiles: eventFile[] = [];
  retrievedImages: eventFile[] = [];
  src: any[] = []

  constructor(private ES: EventService, private _router: Router, private _Activatedroute: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  Remove(id: number) {

    // this.tmp = (new URL(f.filePath)).toString();
    this.ES.RemoveEventFile(this.id, id).subscribe(res => {
      console.log(res);
      console.log("File Deleted");
    });


    setTimeout(() => this.reload(), 1000);
  }


  RemovePdf(id: number) {
    this.ES.RemoveEventFile(this.id, id).subscribe(res => {
        console.log(res);
        console.log("File Deleted");
      }
    );
    setTimeout(() => this.reload(), 1000);
  }


  reload() {
    this.pdf = [];
    this.ES.GetEventFiles(this.id).subscribe(res => {
      this.files = res;
      console.log(res);
      res.forEach(f => {
        if (f.filePath.includes(".pdf")) {
          this.secured = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + f.picByte);
          this.pdf.push(this.secured);
          this.pdfFiles.push(f);

        } else{
          this.retrievedImages.push(f);
          this.src.push(this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
        }
        console.log(this.pdf);
      })
    })

  }

  ngOnInit(): void {
    this.id = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    if (this.id != null) {
      this.ES.GetEvent(this.id).subscribe(res => {
        console.log(res);
        this.e = res;
        this.name = this.e.name;

      });


      this.ES.GetEventFiles(this.id).subscribe(res => {
        this.files = res;
        //console.log(res);
        res.forEach(f => {
          if (f.filePath.includes(".pdf")) {
            this.secured = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64," + f.picByte);
            this.pdf.push(this.secured);
            this.pdfFiles.push(f);

          } else {
            this.retrievedImages.push(f);
            this.src.push(this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + f.picByte))
          }
          //this.retrievedImages.forEach(e=>console.log("retrieved image: "+e.fileName));
          console.log(f.fileName);
          //this.retrievedImages.forEach(e=>console.log("retrieved image: "+e));
          // console.log(this.pdf);
        })
      })
    }
  }

}
