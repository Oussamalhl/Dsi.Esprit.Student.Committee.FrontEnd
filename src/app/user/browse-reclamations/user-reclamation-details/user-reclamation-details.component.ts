import { Component, OnInit } from '@angular/core';
import {Reclamation} from "../../../models/Reclamation";
import {reclamationFile} from "../../../models/reclamationFile";
import {ReclamationService} from "../../../_services/reclamation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-user-reclamation-details',
  templateUrl: './user-reclamation-details.component.html',
  styleUrls: ['./user-reclamation-details.component.scss']
})
export class UserReclamationDetailsComponent implements OnInit {

  name: string = "";
  id!: number;
  r!: Reclamation;
  files: reclamationFile[] = [];
  pdf: any[] = [];
  secured: any;
  pdfFiles: reclamationFile[] = [];
  retrievedImages: reclamationFile[] = [];
  src: any[] = []

  constructor(private RS: ReclamationService, private _router: Router, private _Activatedroute: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  Remove(id: number) {
    this.RS.RemoveReclamationFile(id).subscribe(res => {
      //console.log(res);
      console.log("File Deleted");
      setTimeout(() => this.reload(), 1000);
    });

  }


  reload() {
    this.pdf = []
    this.retrievedImages=[]
    this.RS.GetReclamationFiles(this.id).subscribe(res => {
      this.files = res;
      console.log(res);
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
      this.RS.getReclamation(this.id).subscribe(res => {
        //console.log(res);
        this.r = res;
        this.name = this.r.name;

      });
      this.reload()
    }
  }

}
